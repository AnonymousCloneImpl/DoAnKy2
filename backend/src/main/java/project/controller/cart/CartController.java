package project.controller.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.dto.cart.CartDto;
import project.service.cart.CartService;

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
