package project.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common.ResponseObject;
import project.order.dto.OrderDto;
import project.order.entity.Order;
import project.order.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class OrderController {
	@Autowired
	private OrderService orderService;

	@PostMapping("/orders/place-order")
	public ResponseEntity<String> createOrder(@RequestBody OrderDto orderDto) {
		try {
			Order createdOrder = orderService.createOrder(orderDto);
			return new ResponseEntity<>("Order created successfully. Order ID: "
					+ createdOrder.getId(), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to create order. "
					+ e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/check-order")
	ResponseEntity<ResponseObject> getOrderByPhoneNumber(@RequestParam("q") String number) {
		List<OrderDto> orderList = orderService.getOrderByPhoneNumber(number);
		if (!orderList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("OK", "Get product successfully", orderList));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ResponseObject("Failed", "Can't find order with phone number = " + number, ""));
		}

	}
}
