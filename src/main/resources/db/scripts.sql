create table geo.tracker (
    id integer not null,
    name varchar(20)
);

create sequence geo.tracker_seq
    start with 1
    increment by 1
    no minvalue
    no maxvalue
    cache 1;