package project.service.order;

import org.springframework.stereotype.Service;
import project.dto.order.OrderDto;
import project.dto.order.OrderItemDto;
import project.entity.order.Order;

import java.util.List;

@Service
public interface OrderService {
	public Order createOrder(OrderDto orderDto);

	public void updateStock(OrderItemDto item);

	public List<OrderDto> getOrderByPhoneNumber(String number);

	public void sendEmail(Order order);
}
