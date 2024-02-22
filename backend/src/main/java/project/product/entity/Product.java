package project.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.other_entity.Blog;
import project.other_entity.Color;

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
    @Column(nullable = false, length = 20)
    private String producer;
    @Column(nullable = false, length = 50)
    private String model;
    @Column(nullable = false, length = 50)
    private String name;
    @Column(nullable = false, length = 50)
    private String type;
    @Column(name = "product_detail", columnDefinition = "JSON")
    private String productDetail;
    @Column(nullable = false)
    private Long price;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
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
