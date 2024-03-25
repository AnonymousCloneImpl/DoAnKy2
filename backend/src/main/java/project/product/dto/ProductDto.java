package project.product.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

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
	@JsonIgnoreProperties({"id", "detail"})
	private ProductDetailDto productDetail;
	private Long price;
	private List<String> imageList;
	private byte discountPercentage;
	private BlogDto blog;
	private PurchaseComboItem purchaseComboItem;
	private List<SimilarProductDto> similarProductList;
	private StockDto stock;
	private List<String> configurationList;
}
