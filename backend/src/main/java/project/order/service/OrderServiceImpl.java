package project.order.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.common.GenerateCodeUtils;
import project.common.InputValidUtils;
import project.const_.ORDER_STATUS;
import project.email.EmailService;
import project.order.dto.OrderDto;
import project.order.dto.OrderItemDto;
import project.order.entity.Order;
import project.order.entity.OrderItem;
import project.order.repository.OrderItemRepository;
import project.order.repository.OrderRepository;
import project.product.dto.StockDto;
import project.product.entity.Product;
import project.product.entity.Stock;
import project.product.repository.ProductRepository;
import project.product.repository.StockRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepo;
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private OrderItemRepository orderItemRepo;
    @Autowired
    private StockRepository stockRepo;
    @Autowired
    private EmailService emailService;

    @Transactional
    @Override
    public Order createOrder(OrderDto orderDto) {
        Order order = createOrderObj(orderDto);
        BeanUtils.copyProperties(orderDto, order);
        orderRepo.save(order);

        List<OrderItemDto> orderItemDtoList = orderDto.getOrderItemDtoList();
        for (OrderItemDto item : orderItemDtoList) {
            OrderItem orderItem = createOrderItem(order, item);
            if (orderItem != null) {
                orderItemRepo.save(orderItem);
                updateStock(item);
            }
        }
        return order;
    }

    private Order createOrderObj(OrderDto orderDto) {
        return Order.builder()
            .orderCode(GenerateCodeUtils.getRandomCode(orderDto.getCustomerName()))
            .orderDate(LocalDateTime.now())
            .status(ORDER_STATUS.WAITING)
            .build();
    }

    private OrderItem createOrderItem(Order order, OrderItemDto item) {
        Optional<Product> productOptional = productRepo.findById(item.getProductId());
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            return OrderItem.builder()
                .order(order)
                .quantity(item.getQuantity())
                .product(product)
                .build();
        }
        return null;
    }

    @Override
    public void updateStock(OrderItemDto item) {
        Optional<Stock> stockOptional = stockRepo.findById(item.getProductId());

        if (stockOptional.isPresent()) {
            Stock stock = stockOptional.get();
            StockDto stockDto = StockDto.builder()
                .quantity(stock.getQuantity() - item.getQuantity())
                .sold(stock.getSold() + item.getQuantity())
                .build();
            BeanUtils.copyProperties(stockDto, stock);
            stockRepo.save(stock);
        }
    }

    public List<Order> getOrderByPhoneNumber(String phone) {
		return orderRepo.findByCustomerPhone(phone);
	}

    @Async
    @Override
    public void sendEmail(Order order) {
        try {
            StringBuilder email = new StringBuilder();
            email.append("Thank you for shopping at THẾ GIỚI MANH ĐỘNG\n")
                .append("Order ID: ").append(order.getId()).append("\n")
                .append("Order Code: ").append(order.getOrderCode()).append("\n")
                .append("Order Date: ").append(order.getOrderDate()).append("\n")
                .append("Order Status: ").append(order.getStatus()).append("\n")
                .append("Total Price: ").append(order.getTotalPrice()).append("\n");
            emailService.sendEmail(order.getCustomerEmail(), "Success Order", email.toString());
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
