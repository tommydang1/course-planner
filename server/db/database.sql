CREATE DATABASE planner;

CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    courses VARCHAR[],
    PRIMARY KEY(user_id)
);