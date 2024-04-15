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
import project.dto.order.OrderDto;
import project.dto.payment.PaypalRequestDto;

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

	// TẠO HÓA ĐƠN
	public String createInvoice(OrderDto orderDto) {
		String id = null;

		try {
			URL url = new URL("https://api-m.sandbox.paypal.com/v2/invoicing/invoices");
			HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
			httpConn.setRequestMethod("POST");

			httpConn.setRequestProperty("Authorization", "Bearer A21AAK29IDIhu3f-yfcSK8ennZ8X-velSks5YwtL9I88shUfJalOaeg5OGYe8PNRyPCcpj5siQ37U1SBDvyTI0lWD3qzZyR2A");
			httpConn.setRequestProperty("Content-Type", "application/json");
			httpConn.setRequestProperty("Prefer", "return=representation");

			httpConn.setDoOutput(true);
			OutputStreamWriter writer = new OutputStreamWriter(httpConn.getOutputStream());
			String str = PaymentUtils.paypalQrRequestBuilder(orderDto);

			writer.write(str);
			writer.flush();
			writer.close();
			httpConn.getOutputStream().close();

			InputStream responseStream = httpConn.getResponseCode() / 100 == 2
					? httpConn.getInputStream()
					: httpConn.getErrorStream();
			Scanner s = new Scanner(responseStream).useDelimiter("\\A");
			String response = s.hasNext() ? s.next() : "";
			System.out.println(response);
			Gson gson = new Gson();

			JsonObject jsonObject = gson.fromJson(response, JsonObject.class);

			id = jsonObject.get("id").getAsString();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		return id;
	}

	public void sendInvoice(String id) {
		try {
			URL urlSend = new URL("https://api-m.sandbox.paypal.com/v2/invoicing/invoices/" + id + "/send");
			HttpURLConnection httpConnSend = (HttpURLConnection) urlSend.openConnection();
			httpConnSend.setRequestMethod("POST");

			httpConnSend.setRequestProperty("Authorization", "Bearer A21AAK29IDIhu3f-yfcSK8ennZ8X-velSks5YwtL9I88shUfJalOaeg5OGYe8PNRyPCcpj5siQ37U1SBDvyTI0lWD3qzZyR2A");
			httpConnSend.setRequestProperty("Content-Type", "application/json");
			httpConnSend.setRequestProperty("PayPal-Request-Id", "b1d1f06c7246c");

			httpConnSend.setDoOutput(true);
			OutputStreamWriter writerSend = new OutputStreamWriter(httpConnSend.getOutputStream());
			writerSend.write("{ \"send_to_invoicer\": true }");
			writerSend.flush();
			writerSend.close();
			httpConnSend.getOutputStream().close();

			InputStream responseStreamSend = httpConnSend.getResponseCode() / 100 == 2
					? httpConnSend.getInputStream()
					: httpConnSend.getErrorStream();
			Scanner sSend = new Scanner(responseStreamSend).useDelimiter("\\A");
			String responseSend = sSend.hasNext() ? sSend.next() : "";
			System.out.println(responseSend);
		} catch (IOException e) {
			log.error("Error while send Invoice!");
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
}
