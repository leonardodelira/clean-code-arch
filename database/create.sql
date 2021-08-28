create schema ccca;

create table ccca.item (
  id serial,
  description text,
  price numeric,
  height numeric,
  width numeric,
  length numeric,
  weight numeric
);

insert into ccca.item 
(id, description, price, height, width, length, weight)
values 
('1', 'Guitarra', 1000, 100, 50, 15, 3),
('2', 'Amplificador', 5000, 50, 50, 50, 22),
('3', 'Cabo', 30, 10, 10, 10, 1)