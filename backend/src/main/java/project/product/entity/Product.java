package project.product.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	@Column(nullable = false, columnDefinition = "TEXT")
	private String image;
	@Column(nullable = false)
	private byte discountPercentage;
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<ProductDetail> productDetails;
}
