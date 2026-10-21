package nevans.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CodeResult {
    private boolean success;
    private String reward;
}
