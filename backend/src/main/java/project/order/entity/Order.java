package project.order.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
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
    @Column(name = "order_code", nullable = false, length = 15)
    private String orderCode;
    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ORDER_STATUS status;
    @Column(name = "customer_name", length = 50)
    private String customerName;
    @Column(name = "customer_phone", length = 15, nullable = false)
    private String customerPhone;
    @Column(name = "customer_email", length = 100)
    private String customerEmail;
    @Column(name = "shipping_address")
    private String shippingAddress;
    @Column(name = "total_price")
    private long totalPrice;
    @JsonManagedReference
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItemList;
}
