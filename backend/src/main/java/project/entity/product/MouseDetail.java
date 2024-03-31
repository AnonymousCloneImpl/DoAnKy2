package project.entity.product;

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
@Table(name = "mouse_detail")
public class MouseDetail extends ProductDetail {
	private String sensor;
	private String connection;
	@Column(name = "mouse_connect_type")
	private String mouseConnectType;
	private String dpi;
	@Column(length = 10)
	private String led;
	@Column(name = "charging_port")
	private String chargingPort;
	private String battery;
	private String buttons;
	private String compatibility;
}
