package project.model.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.dto.product.SimilarProductDto;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseComboItem implements Serializable {
	private long id;
	private List<SimilarProductDto> productList;
}
