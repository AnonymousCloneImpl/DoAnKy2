package project.test_momo;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MomoOrderData {
  private String orderCode;
  private double totalPrice;
  private String currency;
  private String method;
  private String description;
}
