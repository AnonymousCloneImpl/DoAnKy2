package project.entity.payment;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment_info")
public class PaymentInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name = "trading_code", nullable = false)
	private String tradingCode;
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@PrePersist
	private void prePersist() {
		setCreatedAt(LocalDateTime.now());
	}
}