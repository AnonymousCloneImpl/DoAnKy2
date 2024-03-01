package project.product.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockDto {
    private long productId;
    private int quantity;
    private int sold;
}
