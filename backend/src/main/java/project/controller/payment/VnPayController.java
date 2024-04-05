package project.controller.payment;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import project.config.VnPayConfig;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/payment/vnpay")
@CrossOrigin(origins = "*")
public class VnPayController extends HttpServlet {

	@PostMapping("/create")
	public String createPayment(@RequestParam(name = "amount") Double amount) {
		Double finalAmount = amount * 100 * 24740;
		String vnp_Version = "2.1.0";
		String vnp_Command = "pay";
		String orderType = "other";
		String bankCode = "NCB";

		String vnp_TxnRef = VnPayConfig.getRandomNumber(8);

		String vnp_TmnCode = VnPayConfig.vnp_TmnCode;

		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", vnp_Version);
		vnp_Params.put("vnp_Command", vnp_Command);
		vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.put("vnp_Amount", String.valueOf(finalAmount));
		vnp_Params.put("vnp_CurrCode", "VND");

		vnp_Params.put("vnp_BankCode", bankCode);
		vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
		vnp_Params.put("vnp_OrderType", orderType);

		vnp_Params.put("vnp_Locale", "vn");
		vnp_Params.put("vnp_ReturnUrl", VnPayConfig.vnp_ReturnUrl);
		vnp_Params.put("vnp_IpAddr", "127.0.0.1");

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String vnp_CreateDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

		cld.add(Calendar.MINUTE, 15);
		String vnp_ExpireDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

		List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator<String> itr = fieldNames.iterator();
		while (itr.hasNext()) {
			String fieldName = itr.next();
			String fieldValue = vnp_Params.get(fieldName);
			if ((fieldValue != null) && (!fieldValue.isEmpty())) {
				//Build hash data
				hashData.append(fieldName);
				hashData.append('=');
				hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
				//Build query
				query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
				query.append('=');
				query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
				if (itr.hasNext()) {
					query.append('&');
					hashData.append('&');
				}
			}
		}
		String queryUrl = query.toString();
		String vnp_SecureHash = VnPayConfig.hmacSHA512(VnPayConfig.secretKey, hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		return VnPayConfig.vnp_PayUrl + "?" + queryUrl;
	}

	@PostMapping("/ajaxServlet2")
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		//Command:querydr

		String vnp_RequestId = VnPayConfig.getRandomNumber(8);
		String vnp_Version = "2.1.0";
		String vnp_Command = "querydr";
		String vnp_TmnCode = VnPayConfig.vnp_TmnCode;
		String vnp_TxnRef = req.getParameter("order_id");
		String vnp_OrderInfo = "Kiem tra ket qua GD OrderId:" + vnp_TxnRef;
		//String vnp_TransactionNo = req.getParameter("transactionNo");
		String vnp_TransDate = req.getParameter("trans_date");

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String vnp_CreateDate = formatter.format(cld.getTime());

		String vnp_IpAddr = VnPayConfig.getIpAddress(req);

		JsonObject vnp_Params = new JsonObject();

		vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
		vnp_Params.addProperty("vnp_Version", vnp_Version);
		vnp_Params.addProperty("vnp_Command", vnp_Command);
		vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);
		//vnp_Params.put("vnp_TransactionNo", vnp_TransactionNo);
		vnp_Params.addProperty("vnp_TransactionDate", vnp_TransDate);
		vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);
		vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);

		String hash_Data = String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode, vnp_TxnRef, vnp_TransDate, vnp_CreateDate, vnp_IpAddr, vnp_OrderInfo);
		String vnp_SecureHash = VnPayConfig.hmacSHA512(VnPayConfig.secretKey, hash_Data);

		vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);

		URL url = new URL(VnPayConfig.vnp_ApiUrl);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("Content-Type", "application/json");
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(vnp_Params.toString());
		wr.flush();
		wr.close();
		int responseCode = con.getResponseCode();
		System.out.println("nSending 'POST' request to URL : " + url);
		System.out.println("Post Data : " + vnp_Params);
		System.out.println("Response Code : " + responseCode);
		BufferedReader in = new BufferedReader(
				new InputStreamReader(con.getInputStream()));
		String output;
		StringBuilder response = new StringBuilder();
		while ((output = in.readLine()) != null) {
			response.append(output);
		}
		in.close();
		System.out.println(response);
	}
}
