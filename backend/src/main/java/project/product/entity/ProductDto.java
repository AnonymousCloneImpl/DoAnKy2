package project.product.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import project.other_entity.Blog;
import project.other_entity.Color;

import java.util.List;

@Getter
@Setter
@Builder
public class ProductDto {
  private long id;
  private String producer;
  private String model;
  private String name;
  private String type;
  private String productDetail;
  private Long price;
  private List<String> imageList;
  private byte discountPercentage;
  private List<Color> colorList;
  private List<Blog> blogList;
  private List<PurchaseComboItem> purchaseComboItemList;
}
