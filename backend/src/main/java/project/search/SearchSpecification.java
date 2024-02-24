package project.search;

import jakarta.persistence.criteria.Predicate;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@NoArgsConstructor
public class SearchSpecification<T> {
	public Specification<T> searchProducts(String keyword) {
		return (root, query, criteriaBuilder) -> {
			String likeKeyword = "%" + keyword + "%";

			Predicate namePredicate = criteriaBuilder.like(root.get("name"), likeKeyword);
			Predicate producerPredicate = criteriaBuilder.like(root.get("producer"), likeKeyword);
			Predicate modelPredicate = criteriaBuilder.like(root.get("model"), likeKeyword);

			return criteriaBuilder.or(namePredicate, producerPredicate, modelPredicate);
		};
	}
}