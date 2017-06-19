create table oauth_client_details (client_id VARCHAR(256) PRIMARY KEY,resource_ids VARCHAR(256),client_secret VARCHAR(256),scope VARCHAR(256),authorized_grant_types VARCHAR(256),web_server_redirect_uri VARCHAR(256),authorities VARCHAR(256),access_token_validity INTEGER,refresh_token_validity INTEGER,additional_information VARCHAR(4096),autoapprove VARCHAR(256));

create table oauth_client_token (token_id VARCHAR(256),token bytea,authentication_id VARCHAR(256),user_name VARCHAR(256),client_id VARCHAR(256));

create table oauth_access_token (token_id VARCHAR(256),token bytea,authentication_id VARCHAR(256),user_name VARCHAR(256),client_id VARCHAR(256),authentication bytea,refresh_token VARCHAR(256));

create table oauth_refresh_token (token_id VARCHAR(256),token bytea,authentication bytea);

create table oauth_code (code VARCHAR(256), authentication bytea);

create table oauth_approvals (userId VARCHAR(256),clientId VARCHAR(256),scope VARCHAR(256),status VARCHAR(10),expiresAt TIMESTAMP,lastModifiedAt TIMESTAMP);


insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Paolo', 'Calao', NOW());
insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Marco', 'Tais', NOW());
insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Paolo', 'Poldo', NOW());
insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Marco', 'Prova', NOW());

insert into room(id, name) values (nextval('hibernate_sequence'), '1');
insert into room(id, name) values (nextval('hibernate_sequence'), '2');
insert into room(id, name) values (nextval('hibernate_sequence'), '3');
insert into room(id, name) values (nextval('hibernate_sequence'), '4');
insert into room(id, name) values (nextval('hibernate_sequence'), 'Magazzino');

insert into painting(id, title, height, width, medium, year, author_id, room_id) values (nextval('hibernate_sequence'), 'Epl', '10', '15', 'Olio su tela', '1923', '1', '5');
insert into painting(id, title, height, width, medium, year, author_id, room_id) values (nextval('hibernate_sequence'), 'Apl', '20', '5', 'Tela su olio', '1945', '2', '5');
insert into painting(id, title, height, width, medium, year, author_id, room_id) values (nextval('hibernate_sequence'), 'Welp', '1', '1', 'Tela su tela', '33', '3', '6');
insert into painting(id, title, height, width, medium, year, author_id, room_id) values (nextval('hibernate_sequence'), 'Eh', '100', '100', 'Olio su olio', '987', '2', '6');

