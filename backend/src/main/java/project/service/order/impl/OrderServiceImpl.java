package project.service.order.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.common.GenerateCodeUtils;
import project.common.PriceUtils;
import project.const_.ORDER_STATUS;
import project.dto.order.OrderDto;
import project.dto.order.OrderItemDto;
import project.dto.product.StockDto;
import project.entity.order.Order;
import project.entity.order.OrderItem;
import project.entity.product.Product;
import project.entity.product.Stock;
import project.model.order.CheckOrderResponse;
import project.repository.OrderItemRepository;
import project.repository.OrderRepository;
import project.service.email.EmailService;
import project.service.order.OrderService;
import project.service.payment.PaymentService;
import project.service.product.ProductService;
import project.service.product.StockService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j(topic = "ORDER_SERVICE")
public class OrderServiceImpl implements OrderService {
    @Autowired
    CacheManager cacheManager;
    @Autowired
    private OrderRepository orderRepo;
    @Autowired
    private OrderItemRepository orderItemRepo;
    @Autowired
    private ProductService productService;
    @Autowired
    private StockService stockService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PaymentService paymentService;

    @Transactional
    @Override
    public Order createOrder(OrderDto orderDto) {
        Order order = createOrderObj();
        BeanUtils.copyProperties(orderDto, order);
        double totalPrice = orderDto.getTotalPrice() + orderDto.getShippingMethod().val;
        order.setTotalPrice(PriceUtils.roundedPrice(totalPrice, 2));
        order.setShippingMethod(orderDto.getShippingMethod());
        orderRepo.save(order);
        List<OrderItemDto> orderItemDtoList = orderDto.getOrderItemDtoList();
        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemDto item : orderItemDtoList) {
            OrderItem orderItem = createOrderItem(order, item);
            if (orderItem != null) {
                orderItems.add(orderItem);
                updateStock(item);
                evictSingleCacheValue("model", orderItem.getProduct().getModel());
            }
        }
        orderItemRepo.saveAll(orderItems);
        paymentService.createPaymentTbl(orderDto, order);
        return order;
    }

    public void evictSingleCacheValue(String cacheName, String cacheKey) {
        Objects.requireNonNull(cacheManager.getCache(cacheName)).evict(cacheKey);
    }

    private Order createOrderObj() {
        return Order.builder()
                .orderCode(GenerateCodeUtils.getRandomCode())
                .status(ORDER_STATUS.WAITING)
                .build();
    }

    private OrderItem createOrderItem(Order order, OrderItemDto item) {
        Optional<Product> productOptional = productService.getById(item.getProductId());
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
        Stock stock = stockService.getById(item.getProductId());

        if (stock != null) {
            StockDto stockDto = StockDto.builder()
                    .quantity(stock.getQuantity() - item.getQuantity())
                    .sold(stock.getSold() + item.getQuantity())
                    .build();
            BeanUtils.copyProperties(stockDto, stock);
            stockService.save(stock);
        }
    }

    @Override
    @Transactional
    public List<CheckOrderResponse> getOrderByPhoneNumber(String phone) {
        List<Order> orders = orderRepo.findByCustomerPhone(phone);
        List<OrderItem> orderItems;

        List<CheckOrderResponse> orderDtoLs = new ArrayList<>();
        List<OrderItemDto> orderItemDtoLs;
        CheckOrderResponse orderRes;
        OrderItemDto orderItemDto;

        for (Order o : orders) {
            orderItemDtoLs = new ArrayList<>();
            orderItems = o.getOrderItemList();
            for (OrderItem item : orderItems) {
                orderItemDto = new OrderItemDto();
                BeanUtils.copyProperties(item, orderItemDto);
                orderItemDto.setProductId(item.getProduct().getId());
                orderItemDto.setProductType(item.getProduct().getType());
                orderItemDto.setProductName(item.getProduct().getName());
                orderItemDto.setProductModel(item.getProduct().getModel());
                orderItemDtoLs.add(orderItemDto);
            }
            orderRes = new CheckOrderResponse();
            BeanUtils.copyProperties(o, orderRes);
            orderRes.setPaymentMethod(paymentService.getPaymentMethodByOrderCode(o.getOrderCode()));

            orderRes.setOrderItemDtoList(orderItemDtoLs);
            orderDtoLs.add(orderRes);
        }
        return orderDtoLs;
    }

    @Override
    @Async
    public void sendEmail(Order order) {
        try {
            StringBuilder email = new StringBuilder();
            email.append("Thank you for shopping at Tek Savvy\n")
                    .append("Order ID: ").append(order.getId()).append("\n")
                    .append("Order Code: ").append(order.getOrderCode()).append("\n")
                    .append("Order Date: ").append(order.getCreatedAt()).append("\n")
                    .append("Order Status: ").append(order.getStatus()).append("\n")
                    .append("Total Price: ").append(order.getTotalPrice()).append("\n");
            emailService.sendEmail(order.getCustomerEmail(), "Success Order", email.toString());
        } catch (Exception e) {
            log.error("Can't send email : {}", e.getMessage());
        }
    }
}
