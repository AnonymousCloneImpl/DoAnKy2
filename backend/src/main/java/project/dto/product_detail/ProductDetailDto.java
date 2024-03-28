package project.dto.product_detail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailDto implements Serializable {
	private long id;
	private String material;
	private String dimensions;
	private String releaseDate;
	private Object detail;
}
