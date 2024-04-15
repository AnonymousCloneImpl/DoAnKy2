package project.model;

import lombok.*;
import project.dto.product.ProductSummaryDto;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Pagination implements Serializable {
	public static final int PAGE_SIZE = 15;
	private int totalPageNumber;
	private long totalElement;
	private int elementPerPage;
	private List<ProductSummaryDto> productSummaryDtoList;
}
