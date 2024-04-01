package project.controller.payment;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import project.const_.PAYMENT_STATUS;
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
		for (Links link : payment.getLinks()) {
			if (link.getRel().equals("approval_url")) {
				return link.getHref();
			}
		}
		return null;
	}

	@GetMapping("/success")
	public RedirectView successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
		Payment payment = paypalService.executePayment(paymentId, payerId);
		if (!payment.getState().equals("approved")) {
			return new RedirectView("http://localhost:3000/order/failed");
		}
		return new RedirectView("http://localhost:3000/order/success");
	}

	@GetMapping("/cancel")
	public PAYMENT_STATUS cancelPay() {
		return PAYMENT_STATUS.CANCEl;
	}

}
