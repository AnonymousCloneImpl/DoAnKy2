package project.service.payment;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.common.PaymentUtils;
import project.config.payment.PaypalConfig;
import project.const_.PAYMENT_METHOD;
import project.dto.order.OrderDto;
import project.dto.payment.PaypalRequestDto;
import project.entity.payment.PaymentTbl;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Service
@Slf4j(topic = "PAYPAL-SERVICE")
public class PaypalService {
	@Autowired
	private APIContext apiContext;
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private PaypalConfig paypalConfig;

	public Payment createPaypalPayment(PaypalRequestDto paypalRequestDto) {
		Double total = BigDecimal.valueOf(paypalRequestDto.getTotal()).setScale(2, RoundingMode.HALF_UP).doubleValue();
		Amount amount = new Amount();
		amount.setCurrency(paypalRequestDto.getCurrency());
		amount.setTotal(String.valueOf(total));

		Transaction transaction = new Transaction();
		transaction.setDescription(paypalRequestDto.getDescription());
		transaction.setAmount(amount);

		List<Transaction> transactions = new ArrayList<>();
		transactions.add(transaction);

		Payer payer = new Payer();
		payer.setPaymentMethod(paypalRequestDto.getMethod());

		Payment payment = new Payment();
		payment.setIntent(paypalRequestDto.getIntent());
		payment.setPayer(payer);
		payment.setTransactions(transactions);
		RedirectUrls redirectUrls = new RedirectUrls();
		redirectUrls.setCancelUrl(paypalRequestDto.getCancelUrl());
		redirectUrls.setReturnUrl(paypalRequestDto.getSuccessUrl());
		payment.setRedirectUrls(redirectUrls);

		try {
			return payment.create(apiContext);
		} catch (PayPalRESTException e) {
			throw new RuntimeException(e);
		}
	}

	public Payment executePayment(String paymentId, String payerId) {
		Payment payment = new Payment();
		try {
			payment.setId(paymentId);
			PaymentExecution paymentExecute = new PaymentExecution();
			paymentExecute.setPayerId(payerId);
			return payment.execute(apiContext, paymentExecute);
		} catch (PayPalRESTException e) {
			payment.setState("PAYMENT_ALREADY_DONE");
			log.warn("Payment failed : " + e.getMessage());
		}
		return payment;
	}

	// TẠO HÓA ĐƠN
	public String createInvoice(OrderDto orderDto, String orderCode) {
		String id;
		try {
			String url = paypalConfig.getInvoiceUrl();
			HttpURLConnection httpConn = createInvoiceHttp(url, true);
			String str = PaymentUtils.paypalQrRequestBuilder(orderDto);
			outputStreamWriterProcess(httpConn, str);
			outputStreamClose(httpConn);
			InputStream responseStream = getInputStream(httpConn);
			Scanner s = new Scanner(responseStream).useDelimiter("\\A");
			String response = s.hasNext() ? s.next() : "";
			Gson gson = new Gson();
			JsonObject jsonObject = gson.fromJson(response, JsonObject.class);
			id = jsonObject.get("id").getAsString();
			PaymentTbl paymentTbl = PaymentTbl.builder()
					.state("Create Invoice")
					.paymentCode(id)
					.orderCode(orderCode)
					.paymentMethod(PAYMENT_METHOD.QRCODE_PAYPAL)
					.detail(jsonObject.toString())
					.build();
			paymentService.save(paymentTbl);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return id;
	}

	public boolean sendInvoice(String id) {
		try {
			String urlSend = paypalConfig.getInvoiceUrl() + id + "/send";
			HttpURLConnection httpConnSend = createInvoiceHttp(urlSend, false);
			outputStreamWriterProcess(httpConnSend, "{ \"send_to_invoicer\": true }");
			outputStreamClose(httpConnSend);
			InputStream responseStream = getInputStream(httpConnSend);
			Scanner sSend = new Scanner(responseStream).useDelimiter("\\A");
			String responseSend = sSend.hasNext() ? sSend.next() : "";
			log.info(responseSend);
			paymentService.updatePayment(id, "Send Invoice");
			return true;
		} catch (Exception e) {
			log.error("Error while send Invoice!");
		}
		return false;
	}

	public String createQrCode(String id) {
		try {
			String urlQR = paypalConfig.getInvoiceUrl() + id + "/generate-qr-code";
			HttpURLConnection httpConnQR = createInvoiceHttp(urlQR, null);
			outputStreamWriterProcess(httpConnQR, "{ \"width\": 400, \"height\": 400}");

			outputStreamClose(httpConnQR);

			InputStream responseStream = getInputStream(httpConnQR);
			Scanner sQr = new Scanner(responseStream).useDelimiter("\\A");
			String responseQr = sQr.hasNext() ? sQr.next() : "";
			System.out.println(responseQr);

			String data = responseQr.split("\n")[4];

			paymentService.updatePaymentQrCode(id, "Create Qr Code", data);
			System.out.println(data);
			return data;
		} catch (Exception e) {
			log.error("Error while create QR Code!");
		}
		return null;
	}

	private HttpURLConnection createInvoiceHttp(String urlStr, Boolean isCreate) {
		try {
			URL url = new URL(urlStr);
			HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
			httpConn.setRequestMethod("POST");
			httpConn.setRequestProperty("Authorization", "Basic " + paypalConfig.getAccessToken());
			httpConn.setRequestProperty("Content-Type", "application/json");
			if (isCreate != null) {
				if (isCreate) {
					httpConn.setRequestProperty("Prefer", "return=representation");
				} else {
					httpConn.setRequestProperty("PayPal-Request-Id", paypalConfig.getRequestId());
				}
			}
			httpConn.setDoOutput(true);
			return httpConn;
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private void outputStreamWriterProcess(HttpURLConnection httpURLConnection, String data) {
		try {
			OutputStreamWriter writerSend = new OutputStreamWriter(httpURLConnection.getOutputStream());
			writerSend.write(data);
			writerSend.flush();
			writerSend.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private void outputStreamClose(HttpURLConnection httpConn) {
		try {
			httpConn.getOutputStream().close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private InputStream getInputStream(HttpURLConnection httpURLConnection) {
		try {
			return httpURLConnection.getResponseCode() / 100 == 2
					? httpURLConnection.getInputStream()
					: httpURLConnection.getErrorStream();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
