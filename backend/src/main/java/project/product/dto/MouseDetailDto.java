package project.product.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MouseDetailDto extends ProductDetailDto {
	private String sensor;
	private String connection;
	private String dpi;
	private boolean led;
	private String chargingPort;
	private String battery;
	private String buttons;
	private String compatibility;
}
