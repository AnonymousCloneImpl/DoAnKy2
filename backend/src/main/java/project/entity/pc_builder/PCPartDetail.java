package project.entity.pc_builder;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.entity.product.ProductDetail;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pc_part_detail")
public class PCPartDetail extends ProductDetail {
	private String spec;
}
