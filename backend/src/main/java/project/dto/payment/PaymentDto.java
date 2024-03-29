package project.dto.payment;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
	private String tradingCode;
	private LocalDateTime createdAt;
}