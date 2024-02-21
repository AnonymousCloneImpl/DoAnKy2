package project.search.entity;

import project.oldEntity.Brand;
import project.oldEntity.Color;

import java.math.BigDecimal;
import java.util.List;

public class ProductSearchDTO {
    private long id;
    private int categoryId;
    private String productCode;
    private Brand brand;
    private long modelId;
    private String name;
    private List<Color> color;
    private int blogId;
    private BigDecimal price;
}
