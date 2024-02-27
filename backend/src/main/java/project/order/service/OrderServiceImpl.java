package project.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.common.GenerateCodeUtils;
import project.const_.ORDER_STATUS;
import project.order.dto.OrderDto;
import project.order.entity.Order;
import project.order.entity.OrderItem;
import project.order.repository.OrderItemRepository;
import project.order.repository.OrderRepository;
import project.product.entity.Product;
import project.product.repository.ProductRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private ProductRepository productRepo;
	private OrderItemRepository orderItemRepo;

	@Override
	public Order createOrder(OrderDto orderDto) {
		Order order = Order.builder()
			.orderCode(GenerateCodeUtils.getRandomCode(orderDto.getCustomerName()))
			.orderDate(LocalDateTime.now())
			.status(ORDER_STATUS.WAITING)
			.customerName(orderDto.getCustomerName())
			.customerPhone(orderDto.getCustomerPhone())
			.customerEmail(orderDto.getCustomerEmail())
			.shippingAddress(orderDto.getShippingAddress())
			.orderItemList(orderDto.getOrderItemList())
			.totalPrice(orderDto.getTotalPrice())
			.build();
		orderRepo.save(order);

		for (OrderItem item : orderDto.getOrderItemList()) {
			System.err.println("product service : " + productRepo.findById(item.getProduct().getId()));
			System.err.println("quantity: " + item.getQuantity());
			Optional<Product> productOptional = productRepo.findById(item.getProduct().getId());

			if (productOptional.isPresent()) {
				Product product = productOptional.get();

				OrderItem orderItem = OrderItem.builder()
					.order(order)
					.quantity(item.getQuantity())
					.product(product)
					.build();
				orderItemRepo.save(orderItem);
				order.getOrderItemList().add(orderItem);
			}
		}
		return order;
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
