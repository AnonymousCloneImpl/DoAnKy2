package project.entity.product;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stock")
public class Stock {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "product_detail_id")
	private ProductDetail productDetail;
	private int quantity;
	private int sold;
	@Column(name = "inserted_time")
	private LocalDateTime insertedTime;
	@Column(name = "updated_time")
	private LocalDateTime updatedTime;
}
