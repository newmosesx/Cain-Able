package nevans.project.controller;

import nevans.project.dto.CodeResult;
import nevans.project.dto.CodeSubmission;
import nevans.project.services.CodeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// Not listed in SecurityConfiguration's permitAll list, so it needs a
// valid JWT -- only a logged-in attacker can attempt a redemption,
// which is what you want once honour/currency get tied to who
// submitted it.
@RestController
public class CodeController {

    private final CodeService codeService;

    public CodeController(CodeService codeService) {
        this.codeService = codeService;
    }

    @PostMapping("/codes/redeem")
    public ResponseEntity<CodeResult> redeem(@RequestBody CodeSubmission submission) {
        return ResponseEntity.ok(codeService.redeem(submission));
    }
}
