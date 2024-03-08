package project.product.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "product_detail")
@Inheritance(strategy = InheritanceType.JOINED)
public class ProductDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String material;
	private String dimensions;
	@Column(name = "release_date")
	private String releaseDate;
	@JsonBackReference
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "product_id")
	private Product product;
}
