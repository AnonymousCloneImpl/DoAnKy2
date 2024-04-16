//package project.config.payment;
//
//import com.google.gson.Gson;
//import com.google.gson.JsonObject;
//import com.paypal.base.rest.APIContext;
//import com.paypal.base.rest.OAuthTokenCredential;
//import com.paypal.base.rest.PayPalRESTException;
//import lombok.Getter;
//import org.apache.http.HttpResponse;
//import org.apache.http.client.HttpClient;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.entity.StringEntity;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.util.EntityUtils;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.UUID;
//
//@Configuration
//@Getter
//public class PaypalConfig {
//	@Value("${paypal.mode}")
//	private String mode;
//	@Value("${paypal.client.id}")
//	private String clientId;
//	@Value("${paypal.client.secret}")
//	private String clientSecret;
//	@Value("${paypal.url.invoice}")
//	public String invoiceUrl;
//	public String accessToken;
//	private long expirationTime;
//
//	public String getAccessToken() {
//		if (accessToken == null || System.currentTimeMillis() >= expirationTime - 10000) {
//			refreshToken();
//		}
//		return accessToken;
//	}
//
//	public String getRequestId() {
//		UUID uuid = UUID.randomUUID();
//		return uuid.toString();
//	}
//
//	private void refreshToken() {
//		HttpClient httpClient = HttpClients.createDefault();
//		HttpPost httpPost = new HttpPost("https://api.paypal.com/v1/oauth2/token");
//
//		JsonObject requestBody = new JsonObject();
//		requestBody.addProperty("grant_type", "client_credentials");
//
//		try {
//			StringEntity entity = new StringEntity(new Gson().toJson(requestBody));
//			httpPost.setEntity(entity);
//			httpPost.setHeader("Content-Type", "application/json");
//
//			HttpResponse response = httpClient.execute(httpPost);
//			JsonObject jsonResponse = new Gson().fromJson(EntityUtils.toString(response.getEntity()), JsonObject.class);
//
//			accessToken = jsonResponse.get("access_token").getAsString();
//			expirationTime = System.currentTimeMillis() + jsonResponse.get("expires_in").getAsLong() * 1000;
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}
//
//	@Bean
//	public Map<String, String> paypalSdkConfig() {
//		Map<String, String> config = new HashMap<>();
//		config.put("mode", mode);
//		return config;
//	}
//
//	@Bean
//	public OAuthTokenCredential oAuthTokenCredential() {
//		Map<String, String> config = new HashMap<>();
//		config.put("mode", mode);
//		return new OAuthTokenCredential(clientId, clientSecret, config);
//	}
//
//	@Bean
//	public APIContext apiContext() {
//		APIContext context = null;
//		try {
//			context = new APIContext(oAuthTokenCredential().getAccessToken());
//		} catch (PayPalRESTException e) {
//			throw new RuntimeException(e);
//		}
//		context.setConfigurationMap(paypalSdkConfig());
//		return context;
//	}
//
//}
