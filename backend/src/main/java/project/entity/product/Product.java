package project.entity.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "producer_id")
    private Producer producer;
    @Column(length = 50)
    private String model;
    @Column(nullable = false, length = 50)
    private String name;
    @Column(nullable = false, length = 50)
    private String type;
    @Column(nullable = false)
    private Double price;
    @ColumnDefault(value = "0")
    private Integer status;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String image;
    @Column(nullable = false)
    private byte discountPercentage;
    @Column(name = "detail", columnDefinition = "TEXT")
    private String details;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Stock> stock;
}
