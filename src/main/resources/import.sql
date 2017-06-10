insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Paolo', 'Calao', NOW());
insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Marco', 'Tais', NOW());
insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Paolo', 'Poldo', NOW());
insert into author(id, name, surname, birthDate) values (nextval('hibernate_sequence'), 'Marco', 'Prova', NOW());

insert into painting(id, title, height, width, medium, year, author_id) values (nextval('hibernate_sequence'), 'Epl', '10', '15', 'Olio su tela', '1923', '1');
insert into painting(id, title, height, width, medium, year, author_id) values (nextval('hibernate_sequence'), 'Apl', '20', '5', 'Tela su olio', '1945', '2');
