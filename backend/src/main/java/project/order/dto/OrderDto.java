package project.order.dto;

import lombok.*;
import project.const_.ORDER_STATUS;
import project.order.entity.OrderItem;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private String orderCode;
    private LocalDateTime orderDate;
    private ORDER_STATUS status;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String shippingAddress;
    private List<OrderItem> orderItemList;
    private long totalPrice;
}
