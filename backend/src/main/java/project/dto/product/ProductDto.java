package project.dto.product;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import project.model.product.PurchaseComboItem;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("product")
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
	private Map<String, String> configurationMap;
}
