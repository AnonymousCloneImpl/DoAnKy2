package project.entity.order;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import project.const_.ORDER_STATUS;
import project.const_.SHIPPING_METHOD;
import project.entity.BaseEntity;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "order_code", nullable = false, length = 15)
    private String orderCode;
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
    private double totalPrice;
    @JsonManagedReference
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItemList;
    private SHIPPING_METHOD shippingMethod;
}
