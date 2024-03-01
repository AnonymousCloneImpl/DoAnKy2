package project.product.utils;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import project.product.entity.Product;

@Component
public class ProductSpecification {

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

    public Specification<Product> nameLike(String name) {
        return (root, query, criteriaBuilder)
            -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }
}