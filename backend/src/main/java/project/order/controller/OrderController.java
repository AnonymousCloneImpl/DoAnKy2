package project.order.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.order.dto.OrderDto;
import project.order.entity.Order;
import project.order.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/place-order")
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
}
