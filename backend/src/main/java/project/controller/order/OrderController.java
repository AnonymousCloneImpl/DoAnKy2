package project.controller.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.const_.PAYMENT_METHOD;
import project.dto.order.OrderDto;
import project.entity.order.Order;
import project.model.ResponseObject;
import project.model.order.CheckOrderResponse;
import project.model.order.OrderResponse;
import project.service.order.OrderService;
import project.service.payment.PaypalService;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class OrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private PaypalService paypalService;

	@PostMapping("/orders/place-order")
	public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderDto orderDto) {
		try {
			Order createdOrder = orderService.createOrder(orderDto);
			orderService.sendEmail(createdOrder);
			if (orderDto.getPaymentMethod() == PAYMENT_METHOD.QRCODE_PAYPAL) {
				String idInvoice = paypalService.createInvoice(orderDto, createdOrder.getOrderCode());
				if (idInvoice != null) {
					return ResponseEntity.ok(
							OrderResponse.builder()
									.paymentCode(idInvoice)
									.orderCode(createdOrder.getOrderCode())
									.message("Order success")
									.build()
					);
				}
			}
			OrderResponse response = OrderResponse.builder()
					.message("Success to create order")
					.orderCode(createdOrder.getOrderCode())
					.build();
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(
					null,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/check-order")
	ResponseEntity<ResponseObject> checkOrder(@RequestParam("q") String number) {
		List<CheckOrderResponse> orderList = orderService.getOrderByPhoneNumber(number);
		if (!orderList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("OK", "Get product successfully", orderList));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ResponseObject("Failed", "Can't find order with phone number = " + number, ""));
		}
	}
}
