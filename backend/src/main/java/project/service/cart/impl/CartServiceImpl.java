package project.service.cart.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.dto.cart.CartDto;
import project.entity.product.Stock;
import project.service.cart.CartService;
import project.service.product.ProductDetailService;
import project.service.product.StockService;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {
	@Autowired
	ProductDetailService productDetailService;
	@Autowired
	StockService stockService;

	@Override
	public void getListProductWithStock(CartDto cartDto) {
		for (int i = 0; i < cartDto.getCartItemDtoList().size(); i++) {
			long pDetailId = productDetailService.getByProductId(cartDto.getCartItemDtoList().get(i).getProductId()).getId();
			Optional<Stock> stock = stockService.findByProductDetailId(pDetailId);
			cartDto.getCartItemDtoList().get(i).setQuantity(stock.get().getQuantity());
		}
	}
}
