package project.product.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stock")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "color_id")
    private Color color;
    private int quantity;
    private int sold;
    @Column(name = "inserted_time")
    private LocalDateTime insertedTime;
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;
}
