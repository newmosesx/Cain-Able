package nevans.project.services;

import nevans.project.dto.CodeResult;
import nevans.project.dto.CodeSubmission;
import nevans.project.models.Code;
import nevans.project.repository.CodeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class CodeService {

    private final CodeRepository codeRepository;

    public CodeService(CodeRepository codeRepository) {
        this.codeRepository = codeRepository;
    }

    public CodeResult redeem(CodeSubmission submission) {
        Optional<Code> match = codeRepository.findByNameAndActiveTrue(submission.getCode());

        if (match.isEmpty()) {
            return new CodeResult(false, null);
        }

        Code code = match.get();

        boolean expired = code.getExpiryDate() != null && code.getExpiryDate().isBefore(LocalDate.now());
        boolean notStarted = code.getStartDate() != null && code.getStartDate().isAfter(LocalDate.now());

        if (expired || notStarted) {
            return new CodeResult(false, null);
        }

        // One-shot capture: deactivate on redemption so the same code
        // can't be captured twice. Remove this if you'd rather allow
        // repeat captures of the same flag.
        code.setActive(false);
        codeRepository.save(code);

        return new CodeResult(true, code.getReward());
    }
}
