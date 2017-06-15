insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Paolo', 'Calao', NOW());
insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Marco', 'Tais', NOW());
insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Paolo', 'Poldo', NOW());
insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Marco', 'Prova', NOW());

insert into room(id, name) values (nextval('hibernate_sequence'), '1');
insert into room(id, name) values (nextval('hibernate_sequence'), 'Magazzino');

insert into painting(id, title, height, width, medium, year, author_id, room_id) values (nextval('hibernate_sequence'), 'Epl', '10', '15', 'Olio su tela', '1923', '1', '5');
insert into painting(id, title, height, width, medium, year, author_id, room_id) values (nextval('hibernate_sequence'), 'Apl', '20', '5', 'Tela su olio', '1945', '2', '5');
insert into painting(id, title, height, width, medium, year, author_id, room_id) values (nextval('hibernate_sequence'), 'Welp', '1', '1', 'Tela su tela', '33', '3', '6');
insert into painting(id, title, height, width, medium, year, author_id, room_id) values (nextval('hibernate_sequence'), 'Eh', '100', '100', 'Olio su olio', '987', '1', '6');

