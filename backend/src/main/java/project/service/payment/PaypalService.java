//package project.service.payment;
//
//import com.google.gson.Gson;
//import com.google.gson.JsonObject;
//import com.paypal.api.payments.*;
//import com.paypal.base.rest.APIContext;
//import com.paypal.base.rest.PayPalRESTException;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import project.common.Encode_Decode;
//import project.common.PaymentUtils;
//import project.config.payment.PaypalConfig;
//import project.dto.order.OrderDto;
//import project.dto.payment.PaypalRequestDto;
//
//import javax.imageio.ImageIO;
//import java.awt.image.BufferedImage;
//import java.io.*;
//import java.math.BigDecimal;
//import java.math.RoundingMode;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Scanner;
//
//@Service
//@Slf4j(topic = "PAYPAL-SERVICE")
//public class PaypalService {
//	@Autowired
//	private APIContext apiContext;
//	private PaypalConfig paypalConfig;
//
//	public Payment createPaypalPayment(PaypalRequestDto paypalRequestDto) {
//		Double total = BigDecimal.valueOf(paypalRequestDto.getTotal()).setScale(2, RoundingMode.HALF_UP).doubleValue();
//		Amount amount = new Amount();
//		amount.setCurrency(paypalRequestDto.getCurrency());
//		amount.setTotal(String.valueOf(total));
//
//		Transaction transaction = new Transaction();
//		transaction.setDescription(paypalRequestDto.getDescription());
//		transaction.setAmount(amount);
//
//		List<Transaction> transactions = new ArrayList<>();
//		transactions.add(transaction);
//
//		Payer payer = new Payer();
//		payer.setPaymentMethod(paypalRequestDto.getMethod());
//
//		Payment payment = new Payment();
//		payment.setIntent(paypalRequestDto.getIntent());
//		payment.setPayer(payer);
//		payment.setTransactions(transactions);
//		RedirectUrls redirectUrls = new RedirectUrls();
//		redirectUrls.setCancelUrl(paypalRequestDto.getCancelUrl());
//		redirectUrls.setReturnUrl(paypalRequestDto.getSuccessUrl());
//		payment.setRedirectUrls(redirectUrls);
//
//		try {
//			return payment.create(apiContext);
//		} catch (PayPalRESTException e) {
//			throw new RuntimeException(e);
//		}
//	}
//
//	// TẠO HÓA ĐƠN
//	public String createInvoice(OrderDto orderDto) {
//		String id;
//
//		try {
//			URL url = new URL(paypalConfig.getInvoiceUrl());
//			HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
//			httpConn.setRequestMethod("POST");
//
//			httpConn.setRequestProperty("Authorization", "Bearer " + paypalConfig.getAccessToken());
//			httpConn.setRequestProperty("Content-Type", "application/json");
//			httpConn.setRequestProperty("Prefer", "return=representation");
//
//			httpConn.setDoOutput(true);
//			OutputStreamWriter writer = new OutputStreamWriter(httpConn.getOutputStream());
//			String str = PaymentUtils.paypalQrRequestBuilder(orderDto);
//
//			writer.write(str);
//			writer.flush();
//			writer.close();
//			httpConn.getOutputStream().close();
//
//			InputStream responseStream = httpConn.getResponseCode() / 100 == 2
//					? httpConn.getInputStream()
//					: httpConn.getErrorStream();
//			Scanner s = new Scanner(responseStream).useDelimiter("\\A");
//			String response = s.hasNext() ? s.next() : "";
//			System.out.println(response);
//			Gson gson = new Gson();
//
//			JsonObject jsonObject = gson.fromJson(response, JsonObject.class);
//
//			id = jsonObject.get("id").getAsString();
//		} catch (IOException e) {
//			throw new RuntimeException(e);
//		}
//		return id;
//	}
//
//	public boolean sendInvoice(String id) {
//		try {
//			URL urlSend = new URL(paypalConfig.getInvoiceUrl() + id + "/send");
//			HttpURLConnection httpConnSend = (HttpURLConnection) urlSend.openConnection();
//			httpConnSend.setRequestMethod("POST");
//
//			httpConnSend.setRequestProperty("Authorization", "Bearer " + paypalConfig.getAccessToken());
//			httpConnSend.setRequestProperty("Content-Type", "application/json");
//			httpConnSend.setRequestProperty("PayPal-Request-Id", paypalConfig.getRequestId());
//
//			httpConnSend.setDoOutput(true);
//			OutputStreamWriter writerSend = new OutputStreamWriter(httpConnSend.getOutputStream());
//			writerSend.write("{ \"send_to_invoicer\": true }");
//			writerSend.flush();
//			writerSend.close();
//			httpConnSend.getOutputStream().close();
//
//			InputStream responseStreamSend = httpConnSend.getResponseCode() / 100 == 2
//					? httpConnSend.getInputStream()
//					: httpConnSend.getErrorStream();
//			Scanner sSend = new Scanner(responseStreamSend).useDelimiter("\\A");
//			String responseSend = sSend.hasNext() ? sSend.next() : "";
//			log.info(responseSend);
//			return true;
//		} catch (IOException e) {
//			log.error("Error while send Invoice!");
//		}
//		return false;
//	}
//
//	public String createQrCode(String id, String orderCode) {
//		try {
//			URL urlQR = new URL(paypalConfig.getInvoiceUrl() + id + "/generate-qr-code");
//			HttpURLConnection httpConnQR = (HttpURLConnection) urlQR.openConnection();
//			httpConnQR.setRequestMethod("POST");
//
//			httpConnQR.setRequestProperty("Authorization", "Bearer " + paypalConfig.getAccessToken());
//			httpConnQR.setRequestProperty("Content-Type", "application/json");
//
//			httpConnQR.setDoOutput(true);
//			OutputStreamWriter writerQr = new OutputStreamWriter(httpConnQR.getOutputStream());
//			writerQr.write("{ \"width\": 400, \"height\": 400}");
//			writerQr.flush();
//			writerQr.close();
//			httpConnQR.getOutputStream().close();
//			InputStream responseStreamQr = httpConnQR.getResponseCode() / 100 == 2
//					? httpConnQR.getInputStream()
//					: httpConnQR.getErrorStream();
//			Scanner sQr = new Scanner(responseStreamQr).useDelimiter("\\A");
//			String responseQr = sQr.hasNext() ? sQr.next() : "";
//			System.out.println(responseQr);
//
//			byte[] data = Encode_Decode.decodeBase64(responseQr.split("\n")[4]);
//			BufferedImage img = ImageIO.read(new ByteArrayInputStream(data));
//			LocalDate currentDate = LocalDate.now();
//			String formattedDate = currentDate.format(DateTimeFormatter.ofPattern("ddMMyy"));
//			String urlFile = "src/main/resources/images/" + orderCode + "_" + formattedDate + ".png";
//			File outputfile = new File(urlFile);
//			ImageIO.write(img, "png", outputfile);
//			return urlFile;
//		} catch (IOException e) {
//			log.error("Error while create QR Code!");
//		}
//		return null;
//	}
//
//	public Payment executePayment(String paymentId, String payerId) {
//		Payment payment = new Payment();
//		try {
//			payment.setId(paymentId);
//			PaymentExecution paymentExecute = new PaymentExecution();
//			paymentExecute.setPayerId(payerId);
//			return payment.execute(apiContext, paymentExecute);
//		} catch (PayPalRESTException e) {
//			payment.setState("PAYMENT_ALREADY_DONE");
//			log.warn("Payment failed : " + e.getMessage());
//		}
//		return payment;
//	}
//}
