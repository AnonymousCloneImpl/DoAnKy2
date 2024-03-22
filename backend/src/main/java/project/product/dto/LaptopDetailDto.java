package project.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LaptopDetailDto extends ProductDetailDto implements Serializable {
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
