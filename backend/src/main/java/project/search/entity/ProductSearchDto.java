package project.search.entity;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductSearchDto {
    private long id;
    private String name;
    private Long price;
    private byte discountPercentage;
}
