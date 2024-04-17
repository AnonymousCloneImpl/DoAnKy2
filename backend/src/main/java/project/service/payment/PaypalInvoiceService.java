package project.service.payment;

import com.paypal.api.payments.Invoice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import project.config.payment.PaypalConfig;

import java.util.Collections;

@Service
public class PaypalInvoiceService {
	@Autowired
	private PaypalConfig paypalConfig;

	@Autowired
	private RestTemplate restTemplate;

	public ResponseEntity<?> createInvoice(Invoice invoice) {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setBasicAuth(paypalConfig.getRequestId(), paypalConfig.getClientSecret());

		HttpEntity<Invoice> requestEntity = new HttpEntity<>(invoice, headers);

		try {
			ResponseEntity<Invoice> responseEntity = restTemplate.postForEntity("https://api.paypal.com/v1/invoicing/invoices", requestEntity, Invoice.class);
			if (responseEntity.getStatusCode() == HttpStatus.CREATED) {
				return ResponseEntity.ok(responseEntity.getBody());
			} else {
				return ResponseEntity.status(responseEntity.getStatusCode()).body("Failed to create invoice: " + responseEntity.getBody());
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create invoice: " + e.getMessage());
		}
	}
}
