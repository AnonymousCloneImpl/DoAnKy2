package project.entity.schedule_repair;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "schedule_repair")
public class ScheduleRepair {
  @Id
  private Long id;
  @Column(name = "customer_name", length = 100, nullable = false)
  private String customerName;
  @Column(name = "customer_phone", length = 15, nullable = false)
  private String customerPhone;
  @Column(name = "customer_email", length = 100)
  private String customerEmail;
  @Column(name = "device_name")
  private String deviceName;
  @Column(name = "service_type", length = 50)
  private String serviceType;
  @Column(name = "schedule_time", length = 50)
  private String scheduleTime;
  @Column(name = "shop_location", length = 100)
  private String location;
}
