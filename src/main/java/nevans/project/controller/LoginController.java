package nevans.project.controller;

import nevans.project.dto.UserLoginCredentials;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import nevans.project.services.SecurityService;

@RestController
public class LoginController {

    private final SecurityService securityService;

    public LoginController(SecurityService securityService) {
        this.securityService = securityService;
    }

    // Was @GetMapping. A GET with a request body is non-standard --
    // some HTTP clients and proxies strip the body from GET requests
    // entirely, which would make login fail unpredictably depending
    // on what's making the call.
    @PostMapping("/login")
    public ResponseEntity<String> loginByUsername(
            @RequestBody
            UserLoginCredentials credentials){

        return ResponseEntity.ok(securityService.loginClient(credentials));
    }
}
