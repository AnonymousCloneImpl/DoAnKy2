package project.cart.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.cart.dto.CartDto;
import project.cart.service.CartService;
import project.product.entity.Stock;
import project.product.repository.ProductDetailRepository;
import project.product.repository.StockRepository;
import project.product.service.ProductDetailService;
import project.product.service.StockService;

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
