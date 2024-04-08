package project.dto.pc_builder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import project.dto.product.StockDto;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PCBuilderPart {
  private long id;
  private String name;
  private String type;
  private double price;
  private String image;
  private byte discountPercentage;
  @JsonIgnoreProperties("sold")
  private StockDto stock;
}
