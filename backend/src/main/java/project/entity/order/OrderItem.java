package project.entity.order;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import project.entity.product.Product;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_item")
public class OrderItem {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;
	@Column(nullable = false)
	private short quantity;
	@JsonIgnoreProperties({"producer", "model", "productDetail", "colorList", "blog", "purchaseComboItemList"})
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;
}
