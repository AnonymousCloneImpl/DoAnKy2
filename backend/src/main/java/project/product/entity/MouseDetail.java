package project.product.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

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
	@Column(length = 10)
	private String led;
	@Column(name = "charging_port")
	private String chargingPort;
	private String battery;
	private String buttons;
	private String compatibility;
}
