package project.product.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HeadphoneDetailDto extends ProductDetailDto implements Serializable {
	private String led;
}
