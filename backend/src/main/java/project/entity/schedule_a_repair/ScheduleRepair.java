package project.entity.schedule_a_repair;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "customer_name", length = 100, nullable = false)
    private String customerName;
    @Column(name = "customer_phone", length = 15, nullable = false)
    private String customerPhone;
    @Column(name = "customer_email", length = 100)
    private String customerEmail;
    @Column(name = "device_name")
    private String deviceName;
    @Column(name = "service_type")
    private String serviceType;
    @Column(name = "schedule_time")
    private String scheduleTime;
    @Column(name = "shop_location")
    private String location;
}
