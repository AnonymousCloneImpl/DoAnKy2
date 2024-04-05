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
			List<Predicate> predicateList = getPredicateList(root, criteriaBuilder, requestDto.getSearchRequestDtoList());

			// Tạo biểu thức tính giá sale
			Expression<Number> priceDiscount = criteriaBuilder.diff(
					root.get("price"),
					criteriaBuilder.quot(
							criteriaBuilder.prod(root.get("price"), root.get("discountPercentage")),
							100.0
					)
			);

			// SORT
			Join<Product, Stock> stockJoin = root.join("stock", JoinType.INNER);
			if (requestDto.getSortDirection() == RequestDto.SORT_DIRECTION.ASC) {
				switch (requestDto.getSortColumn().toLowerCase()) {
					case "sold", "inserted_time" ->
							query.orderBy(criteriaBuilder.asc(stockJoin.get(requestDto.getSortColumn())));

					case "price" -> query.orderBy(
							criteriaBuilder.asc(
									priceDiscount
							)
					);
				}
			} else {
				switch (requestDto.getSortColumn().toLowerCase()) {
					case "sold", "inserted_time" ->
							query.orderBy(criteriaBuilder.desc(stockJoin.get(requestDto.getSortColumn())));

					case "price" -> query.orderBy(
							criteriaBuilder.desc(
									priceDiscount
							)
					);
				}
			}

			return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
		};
	}

	public List<Predicate> getPredicateList(Root<Product> root, CriteriaBuilder criteriaBuilder, List<SearchRequestDto> searchRequestDtoList) {
		List<Predicate> predicateList = new ArrayList<>();
		// JOIN TABLE
		Join<Product, Producer> producerJoin = root.join("producer", JoinType.INNER);

		// CHECK COLUMN
		for (SearchRequestDto searchRequestDto : searchRequestDtoList) {
			String column = searchRequestDto.getColumn();
			Predicate predicate;
			switch (column) {
				case "price":
					String[] objects = searchRequestDto.getValue().split(",");
					predicate = criteriaBuilder.between(
							root.get("price"),
							Double.parseDouble(objects[0]),
							Double.parseDouble(objects[1])
					);
					break;

				case "producer":
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
				case "mouseConnectType":
					Expression<String> expression = criteriaBuilder.function(
							"json_extract",
							String.class,
							root.get("details"),
							criteriaBuilder.literal("$." + searchRequestDto.getColumn())
					);
					predicate = criteriaBuilder.like(
							expression,
							"%" + searchRequestDto.getValue() + "%"
					);
					break;

				default:
					log.warn("Error : column doesn't match!");
					continue;
			}
			predicateList.add(predicate);
			criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
		}

		return predicateList;
	}

	public Specification<Product> findByType(String type) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("type"), "%" + type + "%");
	}

}