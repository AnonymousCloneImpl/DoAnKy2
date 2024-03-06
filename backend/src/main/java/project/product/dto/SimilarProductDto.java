package project.product.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimilarProductDto {
    private long id;
    private String name;
    private String type;
    private Long price;
    private String image;
    private StockDto stock;
    private byte discountPercentage;
}
