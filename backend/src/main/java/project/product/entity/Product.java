package project.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.oldEntity.Blog;
import project.oldEntity.Color;

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
    private String producer;
    private String model;
    private String name;
    private String type;
    private String product_detail;
    private Long price;
    private String image;
    private byte discountPercentage;
    @ManyToMany
    @JoinTable(
        name = "product_color",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "color_id")
    )
    private List<Color> colorList;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Blog> blogList;
    @OneToMany(fetch = FetchType.EAGER)
    private List<PurchaseComboItem> purchaseComboItemList;
}
