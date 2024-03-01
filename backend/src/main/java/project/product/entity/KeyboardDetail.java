package project.product.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "keyboard_detail")
public class KeyboardDetail extends ProductDetail {
	private String type;
	@Column(name = "switch_type")
	private String switchType;
	@Column(name = "cable_length")
	private String cableLength;
	@Column(name = "connection_type")
	private String connectionType;
	private boolean led;
}
