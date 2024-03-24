package project.product.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.entity.Product;
import project.product.models.Pagination;
import project.product.dto.HomePageData;
import project.product.dto.StaticDataProductPage;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {
	Optional<Product> getById(long id);

	Page<Product> getAll(Specification<Product> specification, Pageable pageable);

	Page<Product> getAllBySpecification(Specification<Product> spec, Pageable pageable);

	Pagination getWithPaging(Integer page, Integer limit);

	StaticDataProductPage getStaticDataByType(String type, Integer limit);

	Pagination getProductsByTypeWithPaging(HomePageData searchDto);

	Optional<Object> getByProductTypeAndByName(String type, String name);

	List<Product> findAllByNameAndSortBySold(String name, Pageable pageable);
}
