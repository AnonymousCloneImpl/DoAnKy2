package project.controller.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common.ResponseObject;
import project.dto.order.OrderCheckDto;
import project.dto.order.OrderDto;
import project.dto.order.OrderResponse;
import project.entity.order.Order;
import project.service.order.OrderService;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class OrderController {
	@Autowired
	private OrderService orderService;

	@PostMapping("/orders/place-order")
	public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderDto orderDto) {
		try {
			Order createdOrder = orderService.createOrder(orderDto);
			orderService.sendEmail(createdOrder);
			System.out.println(createdOrder.getOrderCode());
			System.out.println(createdOrder.getPayment().getId());
			OrderResponse response = OrderResponse.builder()
					.message("Success to create order")
					.paymentId(createdOrder.getPayment().getId())
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
		List<OrderCheckDto> orderList = orderService.getOrderByPhoneNumber(number);
		if (!orderList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("OK", "Get product successfully", orderList));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ResponseObject("Failed", "Can't find order with phone number = " + number, ""));
		}
	}
}
