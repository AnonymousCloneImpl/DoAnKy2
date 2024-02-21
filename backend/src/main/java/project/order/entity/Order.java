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
    @Column(name = "order_code")
    private String orderCode;
    @Column(name = "order_date")
    private LocalDateTime orderDate;
    private ORDER_STATUS status;
    @OneToOne()
    @JoinColumn(name = "ship_address_id")
    private Address shippingAddress;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<OrderItem> orderItemList;
    private Long quantity;
}
