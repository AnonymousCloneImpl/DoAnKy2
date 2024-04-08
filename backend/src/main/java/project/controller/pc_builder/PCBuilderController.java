package project.controller.pc_builder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.dto.pc_builder.PCBuilderPartResponse;
import project.service.pc_builder.PCBuilderService;

@RestController
@RequestMapping("/build-pc")
@CrossOrigin(origins = "*")
public class PCBuilderController {
  @Autowired
  PCBuilderService pcBuilderService;

  @GetMapping("")
  ResponseEntity<PCBuilderPartResponse> getAllListPart() {
    PCBuilderPartResponse response = pcBuilderService.getAllListPart();
    return ResponseEntity.status(HttpStatus.OK)
      .body(response);
  }
}
