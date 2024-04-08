package project.dto.order;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
  private Long paymentId;
  private String orderCode;
  private String message;
}
