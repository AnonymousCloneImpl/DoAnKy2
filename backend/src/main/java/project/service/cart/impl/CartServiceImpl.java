package project.service.cart.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.entity.product.Stock;
import project.model.cart.Cart;
import project.model.cart.CartItem;
import project.service.cart.CartService;
import project.service.product.StockService;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    StockService stockService;

    @Override
    public void getListProductWithStock(Cart cart) {
        List<CartItem> ls = cart.getCartItemList();
        for (CartItem item : ls) {
            long id = item.getProductId();
            Stock stock = stockService.findByProductId(id);
            item.setQuantity(stock.getQuantity());
        }
    }
}
