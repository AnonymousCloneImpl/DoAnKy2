package project.order.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.common.GenerateCodeUtils;
import project.const_.ORDER_STATUS;
import project.order.entity.Order;
import project.order.entity.OrderItem;
import project.order.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Order createOrder(List<OrderItem> orderItemList) {
        if (orderItemList == null || orderItemList.isEmpty()) {
            throw new IllegalArgumentException("Order items cannot be null or empty");
        }

        String shippingAddress = "a";

        Order order = Order.builder()
            .orderCode(GenerateCodeUtils.getRandomCode("prefix"))
            .orderDate(LocalDateTime.now())
            .status(ORDER_STATUS.WAITING)
            .customerName("a")
            .customerEmail("a")
            .customerPhone("a")
            .shippingAddress(shippingAddress)
            .orderItemList(orderItemList)
            .build();

        try {
            return orderRepo.save(order);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create order", e);
        }
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepo.findById(id);
    }

    @Override
    public List<Order> getOrdersByStatus(ORDER_STATUS status) {
        return null;
    }

    @Override
    public void confirmOrder(Long orderId) {

    }

    @Override
    public void processPayment(Order order) {

    }

    @Override
    public void processShipping(Order order) {

    }

    @Override
    public void processRefund(Order order) {

    }
}
