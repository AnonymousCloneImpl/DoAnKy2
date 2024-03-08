package project.product.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
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
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@JsonBackReference
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "product_detail_id")
	private ProductDetail productDetail;
	private int quantity;
	private int sold;
	@Column(name = "inserted_time")
	private LocalDateTime insertedTime;
	@Column(name = "updated_time")
	private LocalDateTime updatedTime;
}
