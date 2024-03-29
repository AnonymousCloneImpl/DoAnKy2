package project.entity.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "producer_id")
	private Producer producer;
	@Column(length = 50)
	private String model;
	@Column(nullable = false, length = 50)
	private String name;
	@Column(nullable = false, length = 50)
	private String type;
	@Column(nullable = false)
	private Long price;
	@ColumnDefault(value = "0")
	private Integer status;
	@Column(nullable = false, columnDefinition = "TEXT")
	private String image;
	@Column(nullable = false)
	private byte discountPercentage;
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<ProductDetail> productDetails;
}
