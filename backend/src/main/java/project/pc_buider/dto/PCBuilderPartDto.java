package project.pc_buider.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import project.product.dto.StockDto;
import project.product.entity.ProductDetail;
import project.product.entity.Stock;

import java.util.Optional;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PCBuilderPartDto {
    private long id;
    private String name;
    private String type;
    @JsonIgnoreProperties({"id", "product", "material", "dimension", "releaseDate", "dimensions"})
    private ProductDetail detail;
    private Long price;
    private String image;
    private byte discountPercentage;
    @JsonIgnoreProperties("sold")
    private StockDto stock;
}
