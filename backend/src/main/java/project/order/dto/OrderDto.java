package project.order.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String shippingAddress;
    private List<OrderItemDto> orderItemDtoList;
    private long totalPrice;
}
