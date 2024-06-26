package project.controller.payment;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.dto.payment.CheckoutDto;
import project.dto.payment.PaypalRequestDto;
import project.model.QrCodeResponse;
import project.service.order.OrderService;
import project.service.payment.PaymentService;
import project.service.payment.PaypalService;

@RestController
@RequestMapping("/api/payment/paypal")
@CrossOrigin(origins = "*")
public class PaypalController {
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private PaypalService paypalService;
	@Autowired
	private OrderService orderService;

	@PostMapping("/create")
	public String createPayment(@RequestBody PaypalRequestDto paymentRequest) {
		Payment payment = paypalService.createPaypalPayment(paymentRequest);
		paymentService.updatePaymentByOrderCode(payment.getId(), paymentRequest.getOrderCode());
		for (Links link : payment.getLinks()) {
			if (link.getRel().equals("approval_url")) {
				return link.getHref();
			}
		}
		return null;
	}

	@PostMapping("/checkPayment")
	public ResponseEntity<String> successPay(@RequestBody CheckoutDto body) {
		Payment payment;
		if (body.getPaymentId() != null && body.getPayerID() != null) {
			payment = paypalService.executePayment(body.getPaymentId(), body.getPayerID());
			if (payment.getState().equals("PAYMENT_ALREADY_DONE")) {
				return ResponseEntity.ok("PAYMENT_ALREADY_DONE");
			}
			if (!payment.getState().equals("approved")) {
				paymentService.updatePayment(body.getPaymentId(), payment.getState(), payment.getFailureReason());
				return ResponseEntity.ok("Failed");
			} else {
				paymentService.updatePayment(body.getPaymentId(), payment.getState());
				return ResponseEntity.ok("Success");
			}
		}
		return ResponseEntity.ok("Failed");
	}

	@PostMapping("/get-qrcode")
	public ResponseEntity<QrCodeResponse> getQrCode(@RequestBody PaypalRequestDto paypalRequestDto) {
		QrCodeResponse qrCodeResponse = paypalService.createQrCode(paypalRequestDto.getPaymentCode());
		return ResponseEntity.ok(qrCodeResponse);
	}

}
