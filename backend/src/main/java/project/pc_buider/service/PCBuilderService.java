package project.pc_buider.service;

import org.springframework.stereotype.Service;
import project.pc_buider.dto.PCBuilderPartResponse;

@Service
public interface PCBuilderService {
    public PCBuilderPartResponse getAllListPart();
}