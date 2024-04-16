package project.config.payment;

import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Configuration
@Getter
@Slf4j(topic = "PAYPAL-CONFIG")
public class PaypalConfig {
	@Value("${paypal.mode}")
	private String mode;
	@Value("${paypal.client.id}")
	private String clientId;
	@Value("${paypal.client.secret}")
	private String clientSecret;
	@Value("${paypal.url.invoice}")
	public String invoiceUrl;
	public String accessToken;

	public String getAccessToken() {
		String authString = clientId + ":" + clientSecret;
		return Base64.getEncoder().encodeToString(authString.getBytes());
	}

	public String getRequestId() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString();
	}

	@Bean
	public Map<String, String> paypalSdkConfig() {
		Map<String, String> config = new HashMap<>();
		config.put("mode", mode);
		return config;
	}

	@Bean
	public OAuthTokenCredential oAuthTokenCredential() {
		Map<String, String> config = new HashMap<>();
		config.put("mode", mode);
		return new OAuthTokenCredential(clientId, clientSecret, config);
	}

	@Bean
	public APIContext apiContext() {
		APIContext context = null;
		try {
			context = new APIContext(oAuthTokenCredential().getAccessToken());
		} catch (PayPalRESTException e) {
			throw new RuntimeException(e);
		}
		context.setConfigurationMap(paypalSdkConfig());
		return context;
	}

}
