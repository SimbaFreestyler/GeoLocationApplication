create schema adm;
create schema geo;
create schema veh;

create table adm.user (
    email varchar(50) not null,
    password varchar(100) not null
);

create table adm.driver (
    id integer not null,
    name varchar(20),
    surname varchar(20),
    user_id varchar(50) not null
);

create sequence adm.driver_seq
    start with 1
    increment by 1
    no minvalue
    no maxvalue
    cache 1;