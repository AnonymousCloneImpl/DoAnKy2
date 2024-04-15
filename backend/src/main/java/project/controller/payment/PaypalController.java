package project.controller.payment;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.dto.order.OrderDto;
import project.dto.payment.CheckoutDto;
import project.dto.payment.PaypalRequestDto;
import project.entity.order.Order;
import project.service.order.OrderService;
import project.service.payment.PaymentService;
import project.service.payment.PaypalService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

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

	@PostMapping("/createQrcode")
	public ResponseEntity<byte[]> createQrCode(@RequestBody OrderDto orderDto) {
		Order order = orderService.createOrder(orderDto);
		orderService.sendEmail(order);
		String idInvoice = paypalService.createInvoice(orderDto);
		boolean resultOfSend = paypalService.sendInvoice(idInvoice);
		if (resultOfSend) {
			try {
				String urlFile = paypalService.createQrCode(idInvoice, order.getOrderCode());
				Resource resource = new ClassPathResource(urlFile);
				byte[] imageBytes = Files.readAllBytes(Path.of(resource.getURI()));
				return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(null);
	}

}
