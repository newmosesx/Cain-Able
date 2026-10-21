package nevans.project.services;


import nevans.project.models.Role;
import nevans.project.models.User;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import nevans.project.repository.UsersRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsersRepository userRepo;

    @Autowired
    public CustomUserDetailsService(UsersRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {

        Optional<User> userOptional = userRepo.findByUsername(username);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("Username not found");
        }

        User userObj = userOptional.get();
        Role roleObj = userObj.getRole();

        if (roleObj == null) {
            throw new UsernameNotFoundException("User has no role assigned");
        }

        // Spring Security's .roles(...) expects the bare name (e.g. "ADMIN"),
        // not a "ROLE_" prefixed one -- it adds that prefix itself and will
        // throw if it's already there. Keep roleName in the DB as "ADMIN" /
        // "USER", not "ROLE_ADMIN".
        return org.springframework.security.core.userdetails.User.builder()
                .username(userObj.getUsername())
                .password(userObj.getPassword())
                .roles(roleObj.getRoleName())
                .build();
    }
}
