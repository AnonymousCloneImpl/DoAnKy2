package project.model.product;


import lombok.*;
import project.dto.product.ProducerDto;
import project.dto.product.ProductSummaryDto;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaticDataProductPage implements Serializable {
	private List<ProductSummaryDto> productSummaryDtoList;
	private List<ProducerDto> producerList;
	private Object filter;
}
