package project.dto.product;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class StockDto implements Serializable {
	private long productId;
	private int quantity;
	private int sold;
}
