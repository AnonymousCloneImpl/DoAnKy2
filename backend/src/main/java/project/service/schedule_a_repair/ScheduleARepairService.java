package project.service.schedule_a_repair;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.dto.schedule_a_repair.ScheduleRepairDto;
import project.entity.schedule_a_repair.ScheduleRepair;
import project.repository.ScheduleARepairRepository;

@Service
public class ScheduleARepairService {
    @Autowired
    ScheduleARepairRepository repo;

    public ScheduleRepair createSchedule(ScheduleRepairDto obj) {
        ScheduleRepair scheduleRepair = new ScheduleRepair();
        BeanUtils.copyProperties(obj, scheduleRepair);
        return repo.save(scheduleRepair);
    }
}
