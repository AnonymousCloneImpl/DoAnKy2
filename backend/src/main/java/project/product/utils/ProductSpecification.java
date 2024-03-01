package project.product.utils;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import project.product.entity.Product;

public class ProductSpecification<T> {

    public Specification<Product> searchProducts(String keyword) {
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