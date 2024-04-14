package project.dto.schedule_a_repair;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleRepairDto implements Serializable {
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String deviceName;
    private String serviceType;
    private String scheduleTime;
    private String location;
}
