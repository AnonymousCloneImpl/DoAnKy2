package project.dto.order;

import lombok.*;
import project.const_.PAYMENT_METHOD;
import project.const_.SHIPPING_METHOD;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto implements Serializable {
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String shippingAddress;
    private List<OrderItemDto> orderItemDtoList;
    private double totalPrice;
    private SHIPPING_METHOD shippingMethod;
    private PAYMENT_METHOD paymentMethod;
}
