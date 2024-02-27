package project.order.service;

import org.springframework.stereotype.Service;
import project.const_.ORDER_STATUS;
import project.order.dto.OrderDto;
import project.order.entity.Order;

import java.util.List;
import java.util.Optional;

@Service
public interface OrderService {
    public Order createOrder(OrderDto orderDto);

    public Optional<Order> getOrderById(Long id);

    public List<Order> getOrdersByStatus(ORDER_STATUS status);

    public void confirmOrder(Long orderId);

    public void processPayment(Order order);

    public void processShipping(Order order);

    public void processRefund(Order order);
}
