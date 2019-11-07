CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    email VARCHAR(50),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE resource_query (
    query_id SERIAL PRIMARY KEY,
    api_name VARCHAR(100),
    api_resource_json VARCHAR(50),
    unique_id_number VARCHAR(20),
    age_group VARCHAR(50)
);

CREATE TABLE user_saved_resources (
    user_id BIGINT NOT NULL,
    resource_query_id BIGINT NOT NULL,

    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_resource_query_id FOREIGN KEY (resource_query_id) REFERENCES resource_query(query_id)
);



