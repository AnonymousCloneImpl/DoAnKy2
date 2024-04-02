package project.controller.payment;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
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
		paypalService.updatePayment(paymentRequest.getPaymentId(), payment.getId());
		for (Links link : payment.getLinks()) {
			if (link.getRel().equals("approval_url")) {
				return link.getHref();
			}
		}
		return null;
	}

	@GetMapping("/success")
	public RedirectView successPay(@RequestParam("paymentId") String paymentCode, @RequestParam("PayerID") String payerId) {
		Payment payment = paypalService.executePayment(paymentCode, payerId);
		if (!payment.getState().equals("approved")) {
			paypalService.updatePayment(paymentCode, payment.getState());
			return new RedirectView("http://localhost:3000/order/failed");
		}
		paypalService.updatePayment(paymentCode, payment.getState(), payment.getFailureReason());
		return new RedirectView("http://localhost:3000/order/success");
	}

	@GetMapping("/cancel")
	public RedirectView cancelPay() {
		return new RedirectView("http://localhost:3000/payment/cancel");
	}

}
