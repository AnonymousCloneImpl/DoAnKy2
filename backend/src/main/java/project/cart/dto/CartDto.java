package project.cart.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private List<CartItemDto> cartItemDtoList;
}
