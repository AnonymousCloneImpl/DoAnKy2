package project.dto.product;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCompact implements Serializable {
	private long id;
	private String name;
	private String type;
	private Double price;
	private String image;
	private byte discountPercentage;
}
