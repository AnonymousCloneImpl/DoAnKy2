package project.dto.product;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimilarProductDto implements Serializable {
	private long id;
	private String name;
	private String type;
	private Long price;
	private String image;
	private StockDto stock;
	private byte discountPercentage;
}
