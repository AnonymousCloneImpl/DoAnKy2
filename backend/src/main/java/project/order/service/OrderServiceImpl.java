package project.order.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.common.GenerateCodeUtils;
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
		Order order = Order.builder()
				.orderCode(GenerateCodeUtils.getRandomCode(orderDto.getCustomerName()))
				.orderDate(LocalDateTime.now())
				.status(ORDER_STATUS.WAITING)
				.customerName(orderDto.getCustomerName())
				.customerPhone(orderDto.getCustomerPhone())
				.customerEmail(orderDto.getCustomerEmail())
				.shippingAddress(orderDto.getShippingAddress())
				.totalPrice(orderDto.getTotalPrice())
				.build();
		orderRepo.save(order);

		List<OrderItemDto> orderItemDtoList = orderDto.getOrderItemDtoList();
		for (OrderItemDto item : orderItemDtoList) {
			Optional<Product> productOptional = productRepo.findById(item.getProductId());
			Optional<Stock> stockOptional = stockRepo.findById(item.getProductId());

			if (productOptional.isPresent()) {
				Product product = productOptional.get();
				OrderItem orderItem = OrderItem.builder()
						.order(order)
						.quantity(item.getQuantity())
						.product(product)
						.build();
				orderItemRepo.save(orderItem);
			}

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

		try {
			emailService.sendEmail(order.getCustomerEmail(), "Success Order",
					"Order ID: " + order.getId() + "\n"
							+ "Order Code: " + order.getOrderCode() + "\n"
							+ "Order Date: " + order.getOrderDate() + "\n"
							+ "Order Status: " + order.getStatus() + "\n"
							+ "Total Price: " + order.getTotalPrice());
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return order;
	}

	public List<Order> getOrderByPhoneNumber(String number) {
		return orderRepo.findByCustomerPhone(number);
	}
}
