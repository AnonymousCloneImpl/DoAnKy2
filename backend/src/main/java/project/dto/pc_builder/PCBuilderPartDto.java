package project.dto.pc_builder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import project.dto.product.StockDto;
import project.entity.product.ProductDetail;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PCBuilderPartDto {
	private long id;
	private String name;
	private String type;
	@JsonIgnoreProperties({"id", "product", "material", "dimension", "releaseDate", "dimensions"})
	private ProductDetail detail;
	private Long price;
	private String image;
	private byte discountPercentage;
	@JsonIgnoreProperties("sold")
	private StockDto stock;
}
