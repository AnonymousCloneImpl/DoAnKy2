package project.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.oldEntity.Color;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false, name = "category_id")
    private int categoryId;
    @Column(nullable = false, name = "product_code")
    private String productCode;
    @Column(nullable = false, name = "brand_id")
    private long brandId;
    @Column(nullable = false, name = "model_id")
    private long modelId;
    @Column(nullable = false, unique = true)
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<Color> color;
    @Column(nullable = false, name = "blog_id")
    private int blogId;
    @Column(nullable = false)
    private BigDecimal price;
}
