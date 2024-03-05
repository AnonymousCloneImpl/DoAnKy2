package project.specification;

import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import project.product.entity.LaptopDetail;
import project.product.entity.ProductDetail;

@Component
public class ProductDetailSpecification {

	public Specification<ProductDetail> distinctCpuType() {
		return (root, query, criteriaBuilder) -> {
			query.distinct(true);

			Root<ProductDetail> productDetailRoot = query.from(ProductDetail.class);
			Root<LaptopDetail> laptopDetailRoot = query.from(LaptopDetail.class);

			query.multiselect(laptopDetailRoot.get("cpuType"));

			Predicate joinCondition = criteriaBuilder.equal(productDetailRoot.get("id"), laptopDetailRoot.get("id"));
			query.where(joinCondition);

			return query.getRestriction();
		};
	}
}
