package nevans.project.services;


import nevans.project.entities.Role;
import nevans.project.entities.User;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import nevans.project.repository.RolesRepository;
import nevans.project.repository.UsersRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsersRepository userRepo;
    private final RolesRepository roleRepo;

    @Autowired
    public CustomUserDetailsService(UsersRepository userRepo, RolesRepository roleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {

        Optional<User> userList = userRepo.findByUsername(username);

        if (userList.isEmpty()){
            throw new UsernameNotFoundException("Username not found");
        }

        User userObj = userList.get();
        Optional<Role> roleList = roleRepo.findById(userObj.getId());

        if (roleList.isEmpty()){
            throw new UsernameNotFoundException("Not a username exception: Must be changed to rol not found exception");
        }

        Role roleObj = roleList.get();


        return org.springframework.security.core.userdetails.User.builder()
                .username(userObj.getUsername())
                .password(userObj.getPassword())
                .roles(roleObj.getRoleName())
                .build();
    }
}
