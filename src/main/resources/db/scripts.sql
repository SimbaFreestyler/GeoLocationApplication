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

create table geo.tracker (
    serial_number varchar(20) primary key not null,
    name varchar(20) not null,
    type varchar(20)
);

create table veh.vehicle (
    registration_number varchar(10) not null,
    vin_number varchar(20) not null,
    brand varchar(30),
    model varchar(30)
);

create table geo.location (
    id integer not null,
    timestamp timestamp,
    tracker_id varchar(20) not null,
    foreign key (tracker_id) references geo.tracker (serial_number)
);