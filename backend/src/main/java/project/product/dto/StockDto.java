package project.product.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockDto implements Serializable {
    private long productId;
    private int quantity;
    private int sold;
}
