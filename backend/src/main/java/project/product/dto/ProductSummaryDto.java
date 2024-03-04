package project.product.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductSummaryDto {
	private long id;
	private String name;
	private Long price;
	private byte discountPercentage;
	private String image;
	private String type;
	@JsonIgnoreProperties({"material", "dimensions", "releaseDate", "product", "cpu", "screenResolution", "ports", "os"})
	private Object configuration;
}
