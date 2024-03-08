package project.product.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LaptopDetailDto extends ProductDetailDto {
	private String cpuType;
	private String cpu;
	private String ram;
	private String screenSize;
	private String screenResolution;
	private String storage;
	private String graphicsCard;
	private String ports;
	private String os;
}
