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
@Table(name = "payment")
public class PaymentTbl extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "payment_method")
	private PAYMENT_METHOD paymentMethod;
	@Column(name = "payment_code")
	private String paymentCode;
	private String state;
	private String orderCode;
	@Column(name = "payment_link", columnDefinition = "TEXT")
	private String paymentLink;
	@Column(columnDefinition = "TEXT")
	private String detail;
}
