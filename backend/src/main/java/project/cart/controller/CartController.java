package project.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.cart.dto.CartDto;
import project.cart.service.CartService;
import project.common.ResponseObject;
import project.order.dto.OrderDto;
import project.order.entity.Order;
import project.order.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("")
    public ResponseEntity<CartDto> getCartItemQuantity(@RequestBody CartDto cartDto) {
        cartService.getListProductWithStock(cartDto);
        return ResponseEntity.ok(cartDto);
    }
}
