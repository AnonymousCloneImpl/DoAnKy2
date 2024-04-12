package project.service.cart;

import org.springframework.stereotype.Service;
import project.model.cart.Cart;

@Service
public interface CartService {
    public void getListProductWithStock(Cart cart);
}
