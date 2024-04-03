package project.dto.product;

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
	private ProductDetailDto configuration;
}
