package nevans.project.repository;

import nevans.project.models.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CodeRepository extends JpaRepository<Code, Long> {

    // Note: the derived property name is "active", not "isActive" --
    // Lombok generates isActive() as the getter for a boolean field
    // named isActive, and Spring Data derives the property from that
    // getter's JavaBean name, which strips the "is". findByNameAndIsActiveTrue
    // would fail at startup with "No property 'isActive' found".
    Optional<Code> findByNameAndActiveTrue(String name);
}
