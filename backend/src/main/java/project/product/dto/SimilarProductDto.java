package project.product.dto;

import lombok.*;

import java.util.List;

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
    private byte discountPercentage;
}
