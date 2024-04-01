package project.config;

import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class PaypalConfig {
	@Value("${paypal.mode}")
	private String mode;
	@Value("${paypal.client.id}")
	private String clientId;
	@Value("${paypal.client.secret}")
	private String clientSecret;

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
