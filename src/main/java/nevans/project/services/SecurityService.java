package nevans.project.services;

import nevans.project.dto.UserLoginCredentialsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {


    private final JwtService jwtService;

    private final AuthenticationManager authManager;


    @Autowired
    public SecurityService(
            JwtService jwtService,
            AuthenticationManager authManager
    ) {
        this.jwtService = jwtService;
        this.authManager = authManager;
    }

    public String loginClient( UserLoginCredentialsDto credentials ){

        Authentication authRequest = UsernamePasswordAuthenticationToken
                .unauthenticated(
                        credentials.getUsername(),
                        credentials.getPassword()
                );

        Authentication auth = authManager.authenticate(authRequest);

        if (auth.isAuthenticated()){
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(auth);
            SecurityContextHolder.setContext(context);
            return jwtService.generateToken(credentials.getUsername());
        }

        throw new RuntimeException("Invalid login details");
    }
}
