package project.product.dto;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "ConsentOTP", timeToLive = 3)
public class StaticDataProductPage implements Serializable {
	private List<ProductSummaryDto> productSummaryDtoList;
	private List<ProducerDto> producerList;
	private List<String> cpuList;
	private List<String> ramList;
}
