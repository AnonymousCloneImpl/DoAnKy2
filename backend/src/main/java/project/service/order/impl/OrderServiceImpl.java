package project.service.order.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.common.GenerateCodeUtils;
import project.const_.ORDER_STATUS;
import project.dto.order.OrderDto;
import project.dto.order.OrderItemDto;
import project.dto.product.StockDto;
import project.email.EmailService;
import project.entity.order.Order;
import project.entity.order.OrderItem;
import project.entity.product.Product;
import project.entity.product.Stock;
import project.repository.OrderItemRepository;
import project.repository.OrderRepository;
import project.service.order.OrderService;
import project.service.product.ProductService;
import project.service.product.StockService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
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

	@Transactional
	@Override
	public Order createOrder(OrderDto orderDto) {
		Order order = createOrderObj(orderDto);
		BeanUtils.copyProperties(orderDto, order);
		orderRepo.save(order);

		List<OrderItemDto> orderItemDtoList = orderDto.getOrderItemDtoList();
		List<OrderItem> orderItems = new ArrayList<>();
		for (OrderItemDto item : orderItemDtoList) {
			OrderItem orderItem = createOrderItem(order, item);
			if (orderItem != null) {
				orderItems.add(orderItem);
				updateStock(item);
			}
		}
		orderItemRepo.saveAll(orderItems);
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
		Optional<Stock> stockOptional = stockService.getById(item.getProductId());

		if (stockOptional.isPresent()) {
			Stock stock = stockOptional.get();
			StockDto stockDto = StockDto.builder()
					.quantity(stock.getQuantity() - item.getQuantity())
					.sold(stock.getSold() + item.getQuantity())
					.build();
			BeanUtils.copyProperties(stockDto, stock);
			stockService.save(stock);
		}
	}

	@Override
	public List<OrderDto> getOrderByPhoneNumber(String phone) {
		List<Order> orders = orderRepo.findByCustomerPhone(phone);
		List<OrderItem> orderItems;

		List<OrderDto> orderDtos = new ArrayList<>();
		List<OrderItemDto> orderItemDtos;
		OrderDto orderDto;
		OrderItemDto orderItemDto;

		for (Order o: orders) {
			orderItemDtos  = new ArrayList<>();
			orderItems = o.getOrderItemList();
			for (OrderItem item : orderItems) {
				orderItemDto = new OrderItemDto();
				BeanUtils.copyProperties(item, orderItemDto);
				orderItemDto.setProductId(item.getProduct().getId());
				orderItemDto.setProductType(item.getProduct().getType());
				orderItemDto.setProductName(item.getProduct().getName());
				orderItemDtos.add(orderItemDto);
			}
			orderDto = new OrderDto();
			BeanUtils.copyProperties(o, orderDto);
			orderDto.setOrderItemDtoList(orderItemDtos);
			orderDtos.add(orderDto);
		}
		return orderDtos;
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
