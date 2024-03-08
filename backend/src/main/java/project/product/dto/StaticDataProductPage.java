package project.product.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import project.product.entity.Producer;
import project.product.entity.Product;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaticDataProductPage implements Serializable {
    private List<ProductSummaryDto> productSummaryDtoList;
    private List<Producer> producerList;
    private List<String> cpuList;
    private List<String> ramList;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PurchaseComboItem {
        private long id;
        @JsonIgnoreProperties({"producer", "model", "productDetail", "colorList", "blog", "purchaseComboItemList"})
        private List<Product> productList;
    }
}
