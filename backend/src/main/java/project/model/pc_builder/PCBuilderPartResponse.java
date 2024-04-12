package project.model.pc_builder;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PCBuilderPartResponse {
  public List<PCBuilderPart> cpuList;
  public List<PCBuilderPart> cpuCoolerList;
  public List<PCBuilderPart> motherBoardList;
  public List<PCBuilderPart> memoryList;
  public List<PCBuilderPart> storageList;
  public List<PCBuilderPart> gpuList;
  public List<PCBuilderPart> caseList;
  public List<PCBuilderPart> caseFanList;
  public List<PCBuilderPart> psuList;
  public List<PCBuilderPart> monitorList;
  public List<PCBuilderPart> keyboardList;
  public List<PCBuilderPart> mouseList;
}
