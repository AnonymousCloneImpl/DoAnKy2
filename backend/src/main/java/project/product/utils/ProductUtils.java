package project.product.utils;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import project.models.Pagination;
import project.product.entity.Product;
import project.product.dto.ProductSummaryDto;
import project.product.repository.ProductDetailRepository;
import project.product.repository.ProductRepository;

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
						convertProductsToProductSummaryDtoList(
								products.getContent(),
								modelMapper
						))
				.build();
	}

	public static List<ProductSummaryDto> convertProductsToProductSummaryDtoList(
			List<Product> productList,
			ModelMapper modelMapper
	) {

		List<ProductSummaryDto> productSummaryDtoList = productList.stream().map((
				product -> modelMapper.map(product, ProductSummaryDto.class)
		)).toList();

		for (ProductSummaryDto summaryDto : productSummaryDtoList) {
			summaryDto.setImage(ProductUtils.getFirstImageUrl(summaryDto.getImage()));
		}

		return productSummaryDtoList;
	}

	public static void getConfigurationForDto(
			List<ProductSummaryDto> productSummaryDtoList,
			ProductDetailRepository productDetailRepository
	) {
		for (ProductSummaryDto p : productSummaryDtoList) {
			p.setConfiguration(productDetailRepository.findAllDetailByProductId(p.getId()));
		}
	}
}
