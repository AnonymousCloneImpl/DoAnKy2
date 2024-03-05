package project.specification;

import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import project.product.dto.SearchDto;
import project.product.entity.LaptopDetail;
import project.product.entity.Producer;
import project.product.entity.Product;
import project.product.entity.ProductDetail;
import project.search.dto.RequestDto;
import project.search.dto.SearchRequestDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

	public Specification<Product> specificationBuilder(RequestDto requestDto) {
		return (root, query, criteriaBuilder) -> {
			Join<Product, ProductDetail> productDetailsJoin = root.join("productDetails", JoinType.INNER);
			Join<Product, Producer> producerJoin = root.join("producer", JoinType.INNER);

			List<Predicate> predicateList = new ArrayList<>();

			for (SearchRequestDto searchRequestDto : requestDto.getSearchRequestDtoList()) {
				String column = searchRequestDto.getColumn();

				Path<Object> attributePath;
				if (column.equals("cpuType") || column.equals("ram") || column.equals("hardDisk")) {
					attributePath = productDetailsJoin.get(column);
				} else if (column.equals("producer")) {
					attributePath = producerJoin.get("name");
				} else {
					attributePath = root.get(column);
				}

				switch (searchRequestDto.getOperator()) {
					case IN -> {
						String[] obj = searchRequestDto.getValue().split(",");
						Predicate in = root.in(attributePath, List.of(obj));
						predicateList.add(in);
					}

					case EQUAL -> {
						Predicate equal = criteriaBuilder.equal(
								attributePath
								, searchRequestDto.getValue()
						);
						predicateList.add(equal);
					}

					case LIKE -> {
						Predicate like = criteriaBuilder.like(
								criteriaBuilder.upper(attributePath.as(String.class)),
								"%" + searchRequestDto.getValue() + "%"
						);
						predicateList.add(like);
					}

					case BETWEEN -> {
						String[] obj = searchRequestDto.getValue().split(",");
						Predicate between = criteriaBuilder.between(
								criteriaBuilder.upper(attributePath.as(String.class)),
								obj[0],
								obj[1]
						);
						predicateList.add(between);
					}

					case LESS_THAN -> {
						Predicate lessThan = criteriaBuilder.lessThan(
								criteriaBuilder.upper(attributePath.as(String.class)),
								searchRequestDto.getValue()
						);
						predicateList.add(lessThan);
					}

					case GREATER_THAN -> {
						Predicate greaterThan = criteriaBuilder.greaterThan(
								criteriaBuilder.upper(attributePath.as(String.class)),
								searchRequestDto.getValue()
						);
						predicateList.add(greaterThan);
					}

					default -> {
						System.err.println("ERROR IN specBuilder function!");
					}
				}
			}

			if (Objects.requireNonNull(requestDto.getGlobalOperator()) == RequestDto.GLOBAL_OPERATOR.OR) {
				return criteriaBuilder.or(predicateList.toArray(new Predicate[0]));
			}
			return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
		};
	}

	public Specification<Product> findByType(String type) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.like(root.get("type"), "%" + type + "%");
		};
	}

	public Specification<ProductDetail> findAllProductDetailByType(String type) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.join("product").get("type"), type);
		};
	}

	public Specification<ProductDetail> getByProductType(String productType) {
		return (root, query, criteriaBuilder) -> {
			query.distinct(true);

			root.fetch("product", JoinType.INNER);

			Predicate predicate = criteriaBuilder.equal(root.get("product").get("type"), productType);

			query.where(predicate);

			return predicate;
		};
	}

	public Specification<Product> nameLike(String name) {
		return (root, query, criteriaBuilder)
				-> criteriaBuilder.like(root.get("name"), "%" + name + "%");
	}
}