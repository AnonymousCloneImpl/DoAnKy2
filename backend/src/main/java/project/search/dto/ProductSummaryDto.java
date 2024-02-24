package project.search.dto;

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
}
