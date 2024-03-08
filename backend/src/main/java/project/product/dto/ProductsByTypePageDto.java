package project.product.dto;

import lombok.*;
import project.product.entity.Producer;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductsByTypePageDto implements Serializable {
    private List<Producer> producers;
    private List<ProductSummaryDto> productSummaryDtoList;
}
