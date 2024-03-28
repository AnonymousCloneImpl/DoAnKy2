package project.common;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import project.dto.search.HomePageData;
import project.dto.search.RequestDto;
import project.dto.search.SearchRequestDto;
import project.entity.product.Producer;
import project.entity.product.Product;
import project.entity.product.ProductDetail;
import project.entity.product.Stock;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class ProductSpecification {
	public Specification<Product> findByType(HomePageData searchDto) {
		return (root, query, criteriaBuilder) -> {
			Specification<Product> specification = Specification.where(null);

			if (searchDto.getType() != null) {
				specification = specification.and((root1, query1, criteriaBuilder1) ->
						criteriaBuilder1.equal(root1.get("type"), searchDto.getType()));
			}

			return specification.toPredicate(root, query, criteriaBuilder);
		};
	}

	public Specification<Product> specificationBuilder(RequestDto requestDto) {
		return (root, query, criteriaBuilder) -> {
			Join<Product, ProductDetail> productDetailsJoin = root.join("productDetails", JoinType.INNER);
			Join<Product, Producer> producerJoin = root.join("producer", JoinType.INNER);
			Join<ProductDetail, Stock> stockJoin = productDetailsJoin.join("stock", JoinType.INNER);

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
								attributePath.as(String.class),
								"%" + searchRequestDto.getValue() + "%"
						);
						predicateList.add(like);
					}

					case BETWEEN -> {
						String[] obj = searchRequestDto.getValue().split(",");
						Predicate between = criteriaBuilder.between(
								root.get(column),
								Long.parseLong(obj[0]),
								Long.parseLong(obj[1])
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

			//  SORT
			if (requestDto.getSortDirection() == RequestDto.SORT_DIRECTION.ASC) {
				switch (requestDto.getSortColumn()) {
					case "sold", "inserted_time" ->
							query.orderBy(criteriaBuilder.asc(stockJoin.get(requestDto.getSortColumn())));

					case "price" -> query.orderBy(criteriaBuilder.asc(root.get(requestDto.getSortColumn())));
				}
			} else {
				query.orderBy(criteriaBuilder.desc(stockJoin.get(requestDto.getSortColumn())));
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

	public Specification<ProductDetail> getByProductType(String productType) {
		return (root, query, criteriaBuilder) -> {
			query.distinct(true);

			root.fetch("product", JoinType.INNER);

			Predicate predicate = criteriaBuilder.equal(root.get("product").get("type"), productType);

			query.where(predicate);

			return predicate;
		};
	}
}