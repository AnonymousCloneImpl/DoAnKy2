package project.dto.order;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class OrderItemDto implements Serializable {
	private Long productId;
	private short quantity;
	private String productType;
	private String productName;
}
