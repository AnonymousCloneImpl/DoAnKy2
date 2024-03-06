package project.cart.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {
    private long productId;
    private Integer quantity;
}
