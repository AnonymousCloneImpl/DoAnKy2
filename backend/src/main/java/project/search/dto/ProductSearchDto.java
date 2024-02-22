package project.search.dto;

import lombok.*;

import java.util.List;

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
    private List<String> image;
}
