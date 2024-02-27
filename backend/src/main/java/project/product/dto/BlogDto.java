package project.product.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogDto {
    private Long id;
    private List<String> imageList;
    private String header;
    private List<String> contentList;
}
