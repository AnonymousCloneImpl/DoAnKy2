package project.controller.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.model.cart.Cart;
import project.service.cart.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("")
    public ResponseEntity<Cart> getCartItemQuantity(@RequestBody Cart cart) {
        cartService.getListProductWithStock(cart);
        return ResponseEntity.ok(cart);
    }
}
