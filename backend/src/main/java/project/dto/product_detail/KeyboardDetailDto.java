package project.dto.product_detail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KeyboardDetailDto extends ProductDetailDto implements Serializable {
	private String type;
	private String switchType;
	private String cableLength;
	private String connectionType;
	private String led;
}
