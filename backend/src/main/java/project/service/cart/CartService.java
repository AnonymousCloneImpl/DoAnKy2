package project.service.cart;

import org.springframework.stereotype.Service;
import project.dto.cart.CartDto;

@Service
public interface CartService {
	public void getListProductWithStock(CartDto cartDto);
}
