package project.product.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchDto {
    private String type;
    private Integer page;
    private Integer limit;
    private Integer minPrice;
    private Integer maxPrice;
    private String producer;
    private String cpu;
}
