package project.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @Column(length = 20)
    private String producer;
    @Column(length = 50)
    private String model;
    @Column(nullable = false, length = 50)
    private String name;
    @Column(nullable = false, length = 50)
    private String type;
    @Column(name = "product_detail", columnDefinition = "TEXT")
    private String productDetail;
    @Column(nullable = false)
    private Long price;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String image;
    @Column(nullable = false)
    private byte discountPercentage;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "product_color",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "color_id")
    )
    private List<Color> colorList;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "blog_id")
    private Blog blog;
    @OneToMany(fetch = FetchType.EAGER)
    private List<PurchaseComboItem> purchaseComboItemList;
}
