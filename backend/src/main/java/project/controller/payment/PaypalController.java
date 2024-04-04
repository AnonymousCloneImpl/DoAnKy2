package project.controller.payment;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import project.dto.payment.CheckoutDto;
import project.dto.payment.PaypalRequestDto;
import project.service.payment.paypal.PaypalService;

@RestController
@RequestMapping("/api/payment/paypal")
@CrossOrigin(origins = "*")
public class PaypalController {

	@Autowired
	private PaypalService paypalService;

	@PostMapping("/create")
	public String createPayment(@RequestBody PaypalRequestDto paymentRequest) {
		Payment payment = paypalService.createPayment(paymentRequest);
		paypalService.updatePaymentById(payment.getId(), paymentRequest.getOrderCode());
		for (Links link : payment.getLinks()) {
			if (link.getRel().equals("approval_url")) {
				return link.getHref();
			}
		}
		return null;
	}

	@PostMapping("/checkPayment")
	public ResponseEntity<String> successPay(@RequestBody CheckoutDto body) {
		System.out.println(body);
		Payment payment = paypalService.executePayment(body.getPaymentId(), body.getPayerID());
		if (!payment.getState().equals("approved")) {
			paypalService.updatePayment(body.getPaymentId(), payment.getState(), payment.getFailureReason());
			return ResponseEntity.ok("Failed");
		}
		paypalService.updatePayment(body.getPaymentId(), payment.getState());
		return ResponseEntity.ok("Success");
	}

	@GetMapping("/cancel")
	public RedirectView cancelPay() {
		return new RedirectView("http://localhost:3000/payment/cancel");
	}

}
