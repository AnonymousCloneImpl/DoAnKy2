package project.dto.product;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto implements Serializable {
	private long id;
	private String producer;
	private String model;
	private String name;
	private String type;
	private String details;
	private Double price;
	private List<String> imageList;
	private byte discountPercentage;
	private BlogDto blog;
	private PurchaseComboItem purchaseComboItem;
	private List<SimilarProductDto> similarProductList;
	private StockDto stock;
	private List<String> configurationList;
}
