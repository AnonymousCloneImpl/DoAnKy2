package project.controller.schedule_a_repair;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.dto.schedule_a_repair.ScheduleRepairDto;
import project.service.schedule_a_repair.ScheduleARepairService;

@RestController
@RequestMapping("/service")
@CrossOrigin(origins = "*")
public class ScheduleARepairController {
    @Autowired
    ScheduleARepairService service;

    @PostMapping("/schedule-a-repair")
    public void createScheduleARepair(@RequestBody ScheduleRepairDto obj) {
        try {
            service.createSchedule(obj);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
