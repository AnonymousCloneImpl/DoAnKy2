package project.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.oldEntity.Blog;

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
    @OneToMany(fetch = FetchType.EAGER)
    private List<Blog> blog;
    @OneToMany(fetch = FetchType.EAGER)
    private List<PurchaseComboItem> purchaseComboItemList;
}
