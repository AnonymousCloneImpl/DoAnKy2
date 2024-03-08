package project.product.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "mouse_detail")
public class MouseDetail extends ProductDetail {
	private String sensor;
	private String connection;
	private String dpi;
	private boolean led;
	@Column(name = "charging_port")
	private String chargingPort;
	private String battery;
	private String buttons;
	private String compatibility;
}
