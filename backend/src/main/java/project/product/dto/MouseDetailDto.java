package project.product.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MouseDetailDto extends ProductDetailDto implements Serializable {
	private String sensor;
	private String connection;
	private String dpi;
	private String led;
	private String chargingPort;
	private String battery;
	private String buttons;
	private String compatibility;
}
