package project.dto.product;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import project.dto.product_detail.ProductDetailDto;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductSummaryDto implements Serializable {
	private long id;
	private String name;
	private Double price;
	private byte discountPercentage;
	private String image;
	private String type;
	@JsonIgnoreProperties({"material", "detail", "stockList", "dimensions", "releaseDate", "cpu", "screenResolution", "ports", "os"})
	private ProductDetailDto configuration;
}
