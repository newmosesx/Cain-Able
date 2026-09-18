package nevans.project.controller;

import nevans.project.dto.UserLoginCredentialsDto;
import nevans.project.services.SecurityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private final SecurityService securityService;

    public LoginController(SecurityService securityService) {
        this.securityService = securityService;
    }

    @GetMapping("/login/by/username")
    public ResponseEntity<String> loginByUsername(
            @RequestBody
            UserLoginCredentialsDto credentials){

        return ResponseEntity.ok(securityService.loginClient(credentials));
    }
}
