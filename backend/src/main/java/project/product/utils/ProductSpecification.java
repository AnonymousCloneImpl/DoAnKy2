package project.product.utils;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import project.product.dto.SearchDto;
import project.product.entity.LaptopDetail;
import project.product.entity.Producer;
import project.product.entity.Product;
import project.product.entity.ProductDetail;

import java.util.ArrayList;

@Component
public class ProductSpecification {

	public Specification<Product> filterOfProduct(SearchDto searchDto) {
		return (root, query, criteriaBuilder) -> {
			Specification<Product> specification = Specification.where(null);

			if (searchDto.getType() != null) {
				specification = specification.and((root1, query1, criteriaBuilder1) ->
						criteriaBuilder1.equal(root1.get("type"), searchDto.getType()));
			}

			if (searchDto.getProducer() != null) {
				specification = specification.and((root1, query1, criteriaBuilder1) -> {
					Join<Product, Producer> producerJoin = root1.join("producer");
					return criteriaBuilder1.equal(producerJoin.get("name"), searchDto.getProducer());
				});
			}

			if (searchDto.getMinPrice() != null && searchDto.getMaxPrice() != null) {
				specification = specification.and((root1, query1, criteriaBuilder1) ->
						criteriaBuilder1.between(root1.get("price"), searchDto.getMinPrice(), searchDto.getMaxPrice()));
			}

			if (searchDto.getMinPrice() != null && searchDto.getMaxPrice() == null) {
				specification = specification.and((root1, query1, criteriaBuilder1) ->
						criteriaBuilder1.greaterThanOrEqualTo(root1.get("price"), searchDto.getMinPrice()));
			}

			if (searchDto.getMinPrice() == null && searchDto.getMaxPrice() != null) {
				specification = specification.and((root1, query1, criteriaBuilder1) ->
						criteriaBuilder1.lessThanOrEqualTo(root1.get("price"), searchDto.getMaxPrice()));
			}

			if (searchDto.getCpu() != null) {
				specification = specification.and((root2, query2, criteriaBuilder2) -> {
					query2.distinct(true);
					return criteriaBuilder2.and(
							criteriaBuilder2.equal(root2.join("productDetails").get("cpuType"), searchDto.getCpu().replace("-", " "))
					);
				});
			}

			return specification.toPredicate(root, query, criteriaBuilder);
		};
	}

	public Specification<Product> searchByType(String type) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.like(root.get("type"), "%" + type + "%");
		};
	}

	public Specification<Product> nameLike(String name) {
		return (root, query, criteriaBuilder)
				-> criteriaBuilder.like(root.get("name"), "%" + name + "%");
	}
}