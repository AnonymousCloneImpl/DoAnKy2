package project.dto.payment;

import lombok.*;
import project.const_.PAYMENT_STATUS;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDto {
	private PAYMENT_STATUS status;
	private String message;
	private String returnUrl;
}
