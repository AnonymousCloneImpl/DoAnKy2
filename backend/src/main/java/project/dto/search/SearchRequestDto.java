package project.dto.search;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
public class SearchRequestDto implements Serializable {
    private String column;
    private String value;
}
