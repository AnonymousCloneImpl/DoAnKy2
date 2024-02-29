package project.order.service;

import org.springframework.stereotype.Service;
import project.order.dto.OrderDto;
import project.order.entity.Order;

import java.util.List;
import java.util.Optional;

@Service
public interface OrderService {
    public Order createOrder(OrderDto orderDto);
    public List<Order> getOrderByPhoneNumber(String number);
}
