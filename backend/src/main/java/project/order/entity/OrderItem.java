package project.order.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.product.entity.Product;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_item")
public class OrderItem {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;
	@Column(nullable = false)
	private short quantity;
	@OneToOne
	@JsonIgnoreProperties({"producer", "model", "type", "productDetail", "colorList", "blog", "purchaseComboItemList"})
	private Product product;
}
