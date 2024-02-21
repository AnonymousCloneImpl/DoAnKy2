package project.product.entity;

import lombok.Getter;
import lombok.Setter;
import project.oldEntity.Blog;
import java.util.List;

@Getter
@Setter
public class ProductDto {
  private long id;
  private String producer;
  private String model;
  private String name;
  private String type;
  private String product_detail;
  private String description;
  private Long price;
  private Long imageId;
  private List<Blog> blog;
}
