package project.product.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import project.product.entity.Producer;
import project.product.entity.ProductDetail;

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
