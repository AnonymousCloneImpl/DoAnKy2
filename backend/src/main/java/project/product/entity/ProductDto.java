package project.product.entity;


import lombok.Getter;
import lombok.Setter;
import project.oldEntity.Color;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ProductDto {
  private long id;
  private int categoryId;
  private String productCode;
  private long brandId;
  private long modelId;
  private String name;
  private List<Color> color;
  private int blogId;
  private BigDecimal price;
}
