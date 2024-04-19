package project.service.schedule_a_repair;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import project.dto.schedule_a_repair.ScheduleRepairDto;
import project.entity.order.Order;
import project.entity.schedule_a_repair.ScheduleRepair;
import project.repository.ScheduleARepairRepository;
import project.service.email.EmailService;

@Slf4j(topic = "SCHEDULE_A_REPAIR_SERVICE")
@Service
public class ScheduleARepairService {
    @Autowired
    ScheduleARepairRepository repo;
    @Autowired
    private EmailService emailService;

    public void createSchedule(ScheduleRepairDto obj) {
        ScheduleRepair scheduleRepair = new ScheduleRepair();
        BeanUtils.copyProperties(obj, scheduleRepair);
        repo.save(scheduleRepair);
    }

    @Async
    public void sendEmail(ScheduleRepairDto obj) {
        try {
            StringBuilder email = new StringBuilder();
            email.append("You have a repair appointment scheduled at Tek Savvy\n")
                    .append("Service type: ").append(obj.getServiceType())
                    .append("Time: ").append(obj.getScheduleTime());
            emailService.sendEmail(obj.getCustomerEmail(), "Success Order", email.toString());
        } catch (Exception e) {
            log.error("Can't send email : {}", e.getMessage());
        }
    }
}
