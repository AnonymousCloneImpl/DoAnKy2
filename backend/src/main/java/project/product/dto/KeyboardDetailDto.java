package project.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KeyboardDetailDto extends ProductDetailDto{
    private String type;
    private String switchType;
    private String cableLength;
    private String connectionType;
    private String led;
}
