package project.product.entity;

import lombok.Getter;
import lombok.Setter;
import project.other_entity.Blog;
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
  private Long price;
  private String image;
  private List<Blog> blog;
  private List<PurchaseComboItem> purchaseComboItemList;
}
