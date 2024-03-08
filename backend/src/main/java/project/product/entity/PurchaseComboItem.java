package project.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseComboItem {
	private long id;
	@JsonIgnoreProperties({"producer", "model", "productDetail", "colorList", "blog", "purchaseComboItemList"})
	private List<Product> productList;
}
