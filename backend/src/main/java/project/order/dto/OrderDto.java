package project.order.dto;

import project.const_.ORDER_STATUS;
import project.order.entity.OrderItem;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {
    private Long id;
    private String orderCode;
    private LocalDateTime orderDate;
    private ORDER_STATUS status;
    private String shippingAddress;
    private List<OrderItem> orderItemList;
}
