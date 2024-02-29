package project.product.utils;

import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import project.product.entity.Product;

<<<<<<< HEAD
@NoArgsConstructor
public class ProductSpecification<T> {
	public Specification<T> searchProducts(String keyword) {
=======
public class ProductSpecification<T> {

	public Specification<Product> searchProducts(String keyword) {
>>>>>>> a8e69b47b8815459d93365d50f9c32af1ca49d76
		return (root, query, criteriaBuilder) -> {
			String likeKeyword = "%" + keyword + "%";

			Predicate namePredicate = criteriaBuilder.like(root.get("name"), likeKeyword);
			Predicate producerPredicate = criteriaBuilder.like(root.get("producer"), likeKeyword);
			Predicate modelPredicate = criteriaBuilder.like(root.get("model"), likeKeyword);

			return criteriaBuilder.or(namePredicate, producerPredicate, modelPredicate);
		};
	}

	public Specification<Product> searchByType(String type) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.like(root.get("type"), "%" + type + "%");
		};
	}
}