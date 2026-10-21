package nevans.project.services;

import nevans.project.dto.UserLoginCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {


    private final AuthenticationService jwtService;

    private final AuthenticationManager authManager;


    @Autowired
    public SecurityService(
            AuthenticationService jwtService,
            AuthenticationManager authManager
    ) {
        this.jwtService = jwtService;
        this.authManager = authManager;
    }

    public String loginClient( UserLoginCredentials credentials ) throws AuthenticationException {

        Authentication authRequest = UsernamePasswordAuthenticationToken
                .unauthenticated(
                        credentials.getUsername(),
                        credentials.getPassword()
                );

        // Note: authManager.authenticate() throws (e.g. BadCredentialsException)
        // on bad credentials rather than returning an unauthenticated result,
        // so in practice that's what handles most failures -- this method
        // never reaches the "throw" below for a wrong password. It's kept as
        // a defensive fallback. GlobalExceptionHandler catches both.
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
