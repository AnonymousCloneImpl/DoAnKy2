package project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@MappedSuperclass
public abstract class BaseEntity {
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @Column(name = "update_by")
    private Long updatedBy;
    @Column(name = "is_deleted")
    private Boolean isDeleted = false;

    @PrePersist
    private void prePersist() {
        setCreatedAt(LocalDateTime.now());
        setIsDeleted(false);
    }

    @PreUpdate
    private void preUpdate() {
        setUpdatedAt(LocalDateTime.now());
    }
}
