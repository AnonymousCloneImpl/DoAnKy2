package project.dto.pc_builder;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PCBuilderPartResponse {
	public List<PCBuilderPartDto> cpuList;
	public List<PCBuilderPartDto> cpuCoolerList;
	public List<PCBuilderPartDto> motherBoardList;
	public List<PCBuilderPartDto> memoryList;
	public List<PCBuilderPartDto> storageList;
	public List<PCBuilderPartDto> gpuList;
	public List<PCBuilderPartDto> caseList;
	public List<PCBuilderPartDto> caseFanList;
	public List<PCBuilderPartDto> psuList;
	public List<PCBuilderPartDto> monitorList;
	public List<PCBuilderPartDto> keyboardList;
	public List<PCBuilderPartDto> mouseList;
}
