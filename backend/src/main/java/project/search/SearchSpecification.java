package project.search;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import project.oldEntity.Brand;
import project.oldEntity.Model;
import project.product.entity.Product;

@NoArgsConstructor
public class SearchSpecification<T> {

        public Specification<T> searchProducts(String keyword) {
            return (root, query, criteriaBuilder) -> {
                return criteriaBuilder.like(root.get("name"), "%" + keyword + "%");
            };
        }
}
