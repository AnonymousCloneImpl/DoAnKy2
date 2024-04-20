package project.dto.payment;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutDto {
    private String paymentId;
    private String payerID;
}
