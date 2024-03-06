package project.cart.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.cart.dto.CartDto;
import project.cart.dto.CartItemDto;
import project.cart.service.CartService;
import project.product.entity.Stock;
import project.product.repository.ProductDetailRepository;
import project.product.repository.StockRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    ProductDetailRepository productDetailRepo;
    @Autowired
    StockRepository stockRepo;

    @Override
    public void getListProductWithStock (CartDto cartDto) {
        for (int i = 0; i < cartDto.getCartItemDtoList().size(); i++) {
            long pDetailId = productDetailRepo.findByProductId(cartDto.getCartItemDtoList().get(i).getProductId()).getId();
            Optional<Stock> stock = stockRepo.findByProductDetailId(pDetailId);
            cartDto.getCartItemDtoList().get(i).setQuantity(stock.get().getQuantity());
        }
    }
}
