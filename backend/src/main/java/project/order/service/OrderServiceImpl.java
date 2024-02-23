package project.order.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.common.AutoGenerateOderCodeUtils;
import project.const_.ORDER_STATUS;
import project.order.entity.Order;
import project.order.entity.OrderItem;
import project.order.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepo;
    private final ModelMapper modelMapper;
    private final AutoGenerateOderCodeUtils autoGenerateOrderCodeUtils;
    
    @Autowired
    public OrderServiceImpl(OrderRepository orderRepo, ModelMapper modelMapper, AutoGenerateOderCodeUtils autoGenerateOrderCodeUtils) {
	this.orderRepo = orderRepo;
	this.modelMapper = modelMapper;
	this.autoGenerateOrderCodeUtils = autoGenerateOrderCodeUtils;
    }
    
    @Override
    public Order createOrder(List<OrderItem> orderItemList) {
	try {
	    Order order = Order.builder()
		.orderCode(autoGenerateOrderCodeUtils.autoGenerateCode())
		.orderDate(LocalDateTime.now())
		.status(ORDER_STATUS.WAITING)
		.orderItemList(orderItemList)
		.build();
	    
	    return orderRepo.save(order);
	} catch (Exception e) {
	    System.out.println(e.getMessage());
	    return null;
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
