package project.order.service;

import org.springframework.stereotype.Service;
import project.order.dto.OrderDto;
import project.order.dto.OrderItemDto;
import project.order.entity.Order;

import java.util.List;

@Service
public interface OrderService {
    public Order createOrder(OrderDto orderDto);
    public void updateStock(OrderItemDto item);

//    public void sendEmail(Order order);

    public List<OrderDto> getOrderByPhoneNumber(String number);
}
