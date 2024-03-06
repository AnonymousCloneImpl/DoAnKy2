package project.cart.service;

import org.springframework.stereotype.Service;
import project.cart.dto.CartDto;
import project.cart.dto.CartItemDto;

import java.util.List;

@Service
public interface CartService {
    public void getListProductWithStock (CartDto cartDto);
}
