CREATE MATERIALIZED VIEW entries_by_user AS
SELECT user, id, time, party, code
FROM reservations
WHERE user IS NOT NULL AND id IS NOT NULL AND time IS NOT NULL AND party IS NOT NULL AND code IS NOT NULL
PRIMARY KEY (user, id, code);