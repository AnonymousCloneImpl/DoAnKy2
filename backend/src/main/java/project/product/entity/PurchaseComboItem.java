package project.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "purchase_combo_item")
public class PurchaseComboItem {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@ManyToOne
	@JoinColumn(name = "product_id")
	@JsonIgnoreProperties({"producer", "model", "type", "productDetail", "colorList", "blog", "purchaseComboItemList", "discountPercentage"})
	private Product product;
	@Column(name = "discount_percentage")
	private byte discountPercentage;
}
