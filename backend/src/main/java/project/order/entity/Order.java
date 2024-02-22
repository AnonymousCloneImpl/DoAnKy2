package project.order.entity;

import jakarta.persistence.*;
import lombok.*;
import project.const_.ORDER_STATUS;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "order_code", nullable = false, length = 13)
    private String orderCode;
    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private ORDER_STATUS status;
    @Column(name = "shipping_address")
    private String shippingAddress;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<OrderItem> orderItemList;
    @Column(nullable = false)
    private short quantity;
}
