package nevans.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// Without this, a bad login (or any uncaught exception) falls through
// to Spring's default error handling, which currently means a raw 500
// with no consistent shape. This gives auth failures a clean 401 and
// everything else a generic 500 that doesn't leak internals.
//
// This is also the file to loosen later on purpose if "verbose error
// leakage" ends up on your planted-vulnerability list -- swap the
// generic message for ex.getMessage() / a stack trace to reintroduce
// that flaw deliberately.
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login details");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleUnexpectedException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
    }
}
