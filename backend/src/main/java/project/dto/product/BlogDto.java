package project.dto.product;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogDto implements Serializable {
  private Long id;
  private List<String> imageList;
  private String header;
  private List<String> contentList;
}
