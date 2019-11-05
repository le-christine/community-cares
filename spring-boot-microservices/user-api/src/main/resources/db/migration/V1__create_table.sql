CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    email VARCHAR(50),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE resources (
    resource_id SERIAL PRIMARY KEY,
    program_name VARCHAR(100),
    government_agency VARCHAR(100),
    population_served VARCHAR(100),
    age_group VARCHAR(50),
    plain_language_program_name VARCHAR(255),
    program_description VARCHAR(255)
);

CREATE TABLE user_saved_resources (
    user_id BIGINT,
    resource_id BIGINT
);

ALTER TABLE user_saved_resources ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE user_saved_resources ADD CONSTRAINT fk_resource_id FOREIGN KEY (resource_id) REFERENCES resources(resource_id);


