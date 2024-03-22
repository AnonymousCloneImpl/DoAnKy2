package project.product.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.product.dto.ProductSummaryDto;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pagination implements Serializable {
	public static final int PAGE_SIZE = 15;
	private int totalPageNumber;
	private long totalElement;
	private int elementPerPage;
	private List<ProductSummaryDto> productSummaryDtoList;
}
