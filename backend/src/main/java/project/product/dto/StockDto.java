package project.product.dto;

import lombok.*;
import project.product.entity.Color;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockDto {
    private long productId;
    private List<Integer> colorIdList;
    private int quantity;
    private int sold;
}