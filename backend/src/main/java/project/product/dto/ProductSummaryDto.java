package project.product.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@RedisHash("ProductSummary")
public class ProductSummaryDto implements Serializable {
	private long id;
	private String name;
	private Long price;
	private byte discountPercentage;
	private String image;
	private String type;
	@JsonIgnoreProperties({"material", "dimensions", "releaseDate", "product", "cpu", "screenResolution", "ports", "os"})
	private Object configuration;
}
