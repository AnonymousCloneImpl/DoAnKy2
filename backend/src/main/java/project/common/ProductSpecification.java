package project.common;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
@Slf4j(topic = "PRODUCT-SPECIFICATION")
public class ProductSpecification {
	@Autowired
	public EntityManager entityManager;

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

			// JOIN TABLE
			Join<Product, ProductDetail> productDetailsJoin = root.join("productDetails", JoinType.INNER);
			Join<Product, Producer> producerJoin = root.join("producer", JoinType.INNER);
			Join<ProductDetail, Stock> stockJoin = productDetailsJoin.join("stock", JoinType.INNER);

			List<Predicate> predicateList = new ArrayList<>();

			// CHECK COLUMN
			for (SearchRequestDto searchRequestDto : requestDto.getSearchRequestDtoList()) {
				String column = searchRequestDto.getColumn();
				Path<Object> attributePath;

				Predicate predicate;
				switch (column) {
					case "type" -> {
						attributePath = root.get(column);
						predicate = criteriaBuilder.equal(
								attributePath.as(String.class),
								searchRequestDto.getValue()
						);
						predicateList.add(predicate);
					}

					case "producer" -> {
						attributePath = producerJoin.get("name");
						predicate = criteriaBuilder.equal(
								attributePath.as(String.class),
								searchRequestDto.getValue()
						);
						predicateList.add(predicate);
					}

					case "cpuType", "ram", "hardDisk", "screenSize", "mouseConnectType", "keyboardConnectType" -> {
						attributePath = productDetailsJoin.get(column);
						predicate = criteriaBuilder.like(
								attributePath.as(String.class),
								"%" + searchRequestDto.getValue() + "%"
						);
						predicateList.add(predicate);
					}

					default -> log.warn("Error : column doesn't match!");

				}

				if (Objects.requireNonNull(requestDto.getGlobalOperator()) == RequestDto.GLOBAL_OPERATOR.OR) {
					return criteriaBuilder.or(predicateList.toArray(new Predicate[0]));
				}
			}

			Expression<Number> priceDiscount = criteriaBuilder.quot(
					criteriaBuilder.prod(root.get("price"), root.get("discountPercentage")),
					100.0
			);

			// SORT
			if (requestDto.getSortDirection() == RequestDto.SORT_DIRECTION.ASC) {
				switch (requestDto.getSortColumn()) {
					case "sold", "inserted_time" ->
							query.orderBy(criteriaBuilder.asc(stockJoin.get(requestDto.getSortColumn())));

					case "price" -> query.orderBy(
							criteriaBuilder.asc(
									criteriaBuilder.diff(
											root.get("price"),
											priceDiscount
									)
							)
					);
				}
			} else {
				switch (requestDto.getSortColumn()) {
					case "sold", "inserted_time" ->
							query.orderBy(criteriaBuilder.desc(stockJoin.get(requestDto.getSortColumn())));

					case "price" -> query.orderBy(
							criteriaBuilder.desc(
									criteriaBuilder.diff(
											root.get("price"),
											priceDiscount
									)
							)
					);
				}
			}

			return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
		};
	}

	public Specification<Product> findByType(String type) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.like(root.get("type"), "%" + type + "%");
		};
	}

}