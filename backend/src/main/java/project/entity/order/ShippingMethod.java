package project.entity.order;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shipping_method")
public class ShippingMethod {
    @Id
    private Long id;
    @Column(nullable = false, length = 100)
    private String name;
    @Column(nullable = false)
    private Long price;
}
