package project.dto.order;

import lombok.*;
import project.const_.ORDER_STATUS;
import project.const_.PAYMENT_METHOD;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckOrderResponse implements Serializable {
  private String orderCode;
  private LocalDateTime createdAt;
  private ORDER_STATUS status;
  private List<OrderItemDto> orderItemDtoList;
  private double totalPrice;
  private PAYMENT_METHOD paymentMethod;
}
