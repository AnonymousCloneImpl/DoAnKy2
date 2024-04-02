package project.entity.payment;

import jakarta.persistence.*;
import lombok.*;
import project.const_.PAYMENT_METHOD;
import project.entity.BaseEntity;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment_method")
public class PaymentTbl extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "payment_method")
	private PAYMENT_METHOD paymentMethod;
	@Column(name = "payment_id")
	private String paymentId;
	private String state;
	@Column(name = "failure_reason")
	private String failureReason;
}
