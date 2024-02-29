package project.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.search.dto.ProductSummaryDto;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pagination {
    public static final int PAGE_SIZE = 15;
    private int totalPageNumber;
    private long totalElement;
    private int elementPerPage;
    private List<ProductSummaryDto> productSummaryDtoList;
}
