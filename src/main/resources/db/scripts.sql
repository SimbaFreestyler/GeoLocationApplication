create schema adm;
create schema geo;
create schema veh;
create extension postgis;

create table adm.user (
    email varchar(50) primary key not null,
    password varchar(100) not null
);

create table adm.driver (
    id integer primary key not null,
    name varchar(20),
    surname varchar(20),
    user_id varchar(50) not null,
    foreign key (user_id) references adm.user (email)
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
    type varchar(20),
    user_id varchar(50) not null,
    foreign key (user_id) references adm.user (email)
);

create table veh.vehicle (
    registration_number varchar(10) primary key not null,
    vin_number varchar(20) not null,
    brand varchar(30),
    model varchar(30),
    user_id varchar(50) not null,
    foreign key (user_id) references adm.user (email)
);

create table geo.location (
    id integer not null,
    timestamp timestamp,
    tracker_id varchar(20) not null,
    coords geography,
    foreign key (tracker_id) references geo.tracker (serial_number)
);

create sequence geo.location_seq
    start with 1
    increment by 1
    no minvalue
    no maxvalue
    cache 1;

create table geo.vehicle_tracker (
    vehicle_id varchar not null,
    tracker_id varchar not null,
    start_date date not null,
    end_date date,
    primary key (vehicle_id, tracker_id, start_date),
    constraint fk_vehicle foreign key (vehicle_id) references veh.vehicle (registration_number),
    constraint fk_tracker foreign key (tracker_id) references geo.tracker (serial_number)
);

create table geo.vehicle_driver (
    vehicle_id varchar not null,
    driver_id integer not null,
    start_date date not null,
    end_date date,
    primary key (vehicle_id, driver_id, start_date),
    constraint fk_vehicle foreign key (vehicle_id) references veh.vehicle (registration_number),
    constraint fk_driver foreign key (driver_id) references adm.driver (id)
);