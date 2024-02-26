package project.order.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.order.dto.OrderDto;
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
    public ResponseEntity<String> placeOrder(@RequestBody OrderDto orderDTO) {
        return new ResponseEntity<>("Order placed successfully", HttpStatus.OK);
    }
}
