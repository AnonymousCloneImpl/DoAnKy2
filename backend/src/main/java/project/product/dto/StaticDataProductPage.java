package project.product.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import project.product.entity.Producer;
import project.product.entity.Product;

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
	private List<String> cpuList;
	private List<String> ramList;
}
