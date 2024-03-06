package project.product.dto;

import lombok.*;
import project.product.entity.Producer;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductsByTypePageDto {
    private List<Producer> producers;
    private List<ProductSummaryDto> productSummaryDtoList;
}
