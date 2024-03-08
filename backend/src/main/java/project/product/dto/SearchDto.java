package project.product.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchDto implements Serializable {
    private String type;
    private Integer page;
    private Integer limit;
    private Integer minPrice;
    private Integer maxPrice;
    private String producer;
    private String cpu;
}
