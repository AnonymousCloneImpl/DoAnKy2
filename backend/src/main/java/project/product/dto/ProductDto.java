package project.product.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import project.product.entity.Color;
import project.product.entity.Product;
import project.product.entity.PurchaseComboItem;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
	private long id;
	private String producer;
	private String model;
	private String name;
	private String type;
	private String productDetail;
	private Long price;
	private List<String> imageList;
	private byte discountPercentage;
	private List<Color> colorList;
	private BlogDto blog;
	private PurchaseComboItem purchaseComboItem;
	@JsonIgnoreProperties({"producer", "model", "productDetail", "colorList", "blog", "purchaseComboItemList", "stockList"})
	private List<Product> similarProductList;
}
