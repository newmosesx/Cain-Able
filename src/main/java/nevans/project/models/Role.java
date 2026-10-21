package nevans.project.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "roles-tb")
public class Role {

    @Id
    @Column(name = "role_id")
    private long roleId;

    @Column(name = "role_name")
    private String roleName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "is_active")
    private boolean isActive;

    // No back-reference to User here. A bidirectional @OneToMany would
    // work, but combined with Lombok's @Data (which generates toString/
    // equals/hashCode over every field) a User <-> Role cycle causes
    // infinite recursion the first time either gets logged or hashed.
    // Not worth it for what this entity needs to do.
}
