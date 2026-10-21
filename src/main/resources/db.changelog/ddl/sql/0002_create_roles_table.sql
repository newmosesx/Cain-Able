CREATE TABLE roles (
    role_id    BIGINT PRIMARY KEY,
    user_id    BIGINT,
    role_name  VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    is_active  ChAR(1),

    FOREIGN KEY (user_id) REFERENCES users(user_id)
)