package project.dto;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LaptopFilter implements Serializable {
	private List<String> cpuList;
	private List<String> ramList;
	private List<String> displayList;
}
