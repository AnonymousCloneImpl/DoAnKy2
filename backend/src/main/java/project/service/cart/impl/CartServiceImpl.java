package project.service.cart.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.dto.cart.CartDto;
import project.dto.cart.CartItemDto;
import project.entity.product.Stock;
import project.service.cart.CartService;
import project.service.product.StockService;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
  @Autowired
  StockService stockService;

  @Override
  public void getListProductWithStock(CartDto cartDto) {
    List<CartItemDto> ls = cartDto.getCartItemDtoList();
    for (CartItemDto item : ls) {
      long id = item.getProductId();
      Stock stock = stockService.findByProductId(id);
      item.setQuantity(stock.getQuantity());
    }
  }
}
