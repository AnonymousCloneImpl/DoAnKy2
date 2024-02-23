package project.product.dto;

import jakarta.persistence.*;
import lombok.*;
import project.product.entity.Product;

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
