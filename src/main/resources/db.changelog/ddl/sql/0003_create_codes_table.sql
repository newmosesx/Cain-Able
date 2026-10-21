CREATE TABLE codes (
   code_id BIGINT,
   code_name VARCHAR(255),
   start_date TIMESTAMP,
   expiry_date TIMESTAMP,
   created_at TIMESTAMP,
   updated_at TIMESTAMP,
   created_by VARCHAR(255),
   updated_by VARCHAR(255),
   is_active CHAR(1),
   reward VARCHAR(2)
)