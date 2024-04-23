package project.common;

import jakarta.persistence.criteria.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import project.dto.search.RequestDto;
import project.dto.search.SearchRequestDto;
import project.entity.product.Producer;
import project.entity.product.Product;
import project.entity.product.Stock;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j(topic = "PRODUCT-SPECIFICATION")
public class ProductSpecification {

	public Specification<Product> specificationBuilder(RequestDto requestDto) {
		return (root, query, criteriaBuilder) -> {
			// CREATE PREDICATE LIST
			List<Predicate> predicateList =
					this.getPredicateList(root, criteriaBuilder, requestDto.getSearchRequestDtoList());
			// SORT
			this.sortProductPage(criteriaBuilder, root, query, requestDto);
			return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
		};
	}

	public List<Predicate> getPredicateList(Root<Product> root,
	                                        CriteriaBuilder criteriaBuilder,
	                                        List<SearchRequestDto> searchRequestDtoList) {
		List<Predicate> predicateList = new ArrayList<>();
		// CHECK COLUMN
		for (SearchRequestDto searchRequestDto : searchRequestDtoList) {
			String column = searchRequestDto.getColumn();
			Predicate predicate;
			switch (column) {
				case "price":
					String[] objects = searchRequestDto.getValue().split(",");
					predicate = criteriaBuilder.between(
							this.createExpressionPrice(criteriaBuilder, root),
							Double.parseDouble(objects[0]),
							Double.parseDouble(objects[1])
					);
					break;

				case "producer":
					Join<Product, Producer> producerJoin = root.join("producer", JoinType.INNER);
					predicate = criteriaBuilder.equal(
							producerJoin.get("name"),
							searchRequestDto.getValue()
					);
					break;

				case "type":
					predicate = criteriaBuilder.equal(
							root.get("type"),
							searchRequestDto.getValue()
					);
					break;

				case "cpuType":
				case "ram":
				case "hardDisk":
				case "screenSize":
				case "connection":
					predicate = criteriaBuilder.like(
							this.createExpressionJson(criteriaBuilder, root, column),
							"%" + searchRequestDto.getValue() + "%"
					);
					break;

				default:
					log.warn("Error : column doesn't match!");
					continue;
			}
			predicateList.add(predicate);
		}
		return predicateList;
	}

	public void sortProductPage(CriteriaBuilder criteriaBuilder,
	                            Root<Product> root,
	                            CriteriaQuery<?> query,
	                            RequestDto requestDto) {
		Join<Product, Stock> stockJoin = root.join("stock", JoinType.INNER);
		Expression<Double> priceExpression = this.createExpressionPrice(criteriaBuilder, root);
		switch (requestDto.getSortColumn()) {
			case "sold", "insertedTime" -> query.orderBy(
					criteriaBuilder.desc(stockJoin.get(requestDto.getSortColumn()))
			);

			case "price" -> query.orderBy(
					requestDto.getSortDirection() == RequestDto.SORT_DIRECTION.ASC
							? criteriaBuilder.asc(priceExpression)
							: criteriaBuilder.desc(priceExpression)
			);
			default -> log.error("Column for SORT doesn't not match!");
		}
	}

	public Expression<Double> createExpressionPrice(CriteriaBuilder criteriaBuilder, Root<Product> root) {
		return criteriaBuilder.diff(
				root.get("price"),
				criteriaBuilder.quot(
						criteriaBuilder.prod(root.get("price"), root.get("discountPercentage")),
						100.0
				).as(Double.class)
		);
	}

	public Expression<String> createExpressionJson(CriteriaBuilder criteriaBuilder, Root<Product> root, String column) {
		return criteriaBuilder.function(
				"json_extract",
				String.class,
				root.get("details"),
				criteriaBuilder.literal("$." + column)
		);
	}

	public Specification<Product> findByType(String type) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("type"), "%" + type + "%");
	}

}
