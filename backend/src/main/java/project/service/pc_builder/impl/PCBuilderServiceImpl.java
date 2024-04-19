package project.service.pc_builder.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.const_.PC_PART_TYPE;
import project.model.pc_builder.PCBuilderPartResponse;
import project.service.pc_builder.PCBuilderService;

@Service
public class PCBuilderServiceImpl implements PCBuilderService {
    @Autowired
    PCPartService pcPartService;

    @Override
    public PCBuilderPartResponse getAllListPart() {
        return PCBuilderPartResponse.builder()
                .cpuList(pcPartService.getPartListByType(PC_PART_TYPE.CPU))
                .cpuCoolerList(pcPartService.getPartListByType(PC_PART_TYPE.CPU_COOLER))
                .motherBoardList(pcPartService.getPartListByType(PC_PART_TYPE.MOTHER_BOARD))
                .memoryList(pcPartService.getPartListByType(PC_PART_TYPE.MEMORY))
                .storageList(pcPartService.getPartListByType(PC_PART_TYPE.STORAGE))
                .gpuList(pcPartService.getPartListByType(PC_PART_TYPE.GPU))
                .caseList(pcPartService.getPartListByType(PC_PART_TYPE.CASE))
                .caseFanList(pcPartService.getPartListByType(PC_PART_TYPE.CASE_FAN))
                .psuList(pcPartService.getPartListByType(PC_PART_TYPE.PSU))
                .monitorList(pcPartService.getPartListByType(PC_PART_TYPE.MONITOR))
                .keyboardList(pcPartService.getPartListByType(PC_PART_TYPE.KEYBOARD))
                .mouseList(pcPartService.getPartListByType(PC_PART_TYPE.MOUSE))
                .build();
    }

}
