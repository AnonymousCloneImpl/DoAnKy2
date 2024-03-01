package project.product.utils;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import project.models.Pagination;
import project.product.entity.Product;
import project.search.dto.ProductSummaryDto;

import java.util.List;

public class ProductUtils {

    public static String getFirstImageUrl(String imageList) {
        return imageList.split("\\|")[0];
    }

    public static Pagination convertPageProductToPaginationObject(Page<Product> products, ModelMapper modelMapper) {
        return Pagination.builder()
            .totalPageNumber(products.getTotalPages())
            .totalElement(products.getTotalElements())
            .elementPerPage(Pagination.PAGE_SIZE)
            .productSummaryDtoList(
                products.stream().map((product
                        -> modelMapper.map(product, ProductSummaryDto.class)))
                    .toList())
            .build();
    }

    public static List<ProductSummaryDto> convertProductsToProductSummaryDtoList(List<Product> productList, ModelMapper modelMapper) {
        return productList.stream().map((
            product -> modelMapper.map(product, ProductSummaryDto.class)
        )).toList();
    }
}
