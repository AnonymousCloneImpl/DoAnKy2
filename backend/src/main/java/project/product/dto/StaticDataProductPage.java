package project.product.dto;

import lombok.*;
import project.product.entity.Producer;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaticDataProductPage {
    private List<ProductSummaryDto> productSummaryDtoList;
    private List<Producer> producerList;
    private List<String> cpuList;
    private List<String> ramList;
}
