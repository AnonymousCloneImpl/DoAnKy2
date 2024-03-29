package project.dto.payment;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingMethodDto {
    private Long id;
    private String name;
    private Long price;
}
