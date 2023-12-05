CREATE SEQUENCE SEQUENCE_USER_ID INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQUENCE_ADMIN_ID INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQUENCE_TVSHOW_ID INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQUENCE_WATCHLIST_ID INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQUENCE_REVIEW_ID INCREMENT BY 1 START WITH 1;

DROP SEQUENCE sequence_user_id;
DROP SEQUENCE sequence_admin_id;
DROP SEQUENCE sequence_tvshow_id;
DROP SEQUENCE sequence_watchlist_id;
DROP SEQUENCE sequence_review_id;

alter table users
modify user_id default sequence_user_id.nextval;

alter table admin
modify admin_id default sequence_admin_id.nextval;

alter table tv_show
modify tv_show_id default sequence_tvshow_id.nextval;

alter table watchlist
modify watchlist_id default sequence_watchlist_id.nextval;

alter table reviews
modify review_id default sequence_review_id.nextval;

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username varchar2(50),
    password varchar2(20)
);

CREATE TABLE admin (
admin_id INT PRIMARY KEY,
username varchar2(50),
password varchar2(20)
);

CREATE TABLE watchlist (
    watchlist_id INT PRIMARY KEY,
    name varchar2(50),
    list_length INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE tv_show (
    tv_show_id INT PRIMARY KEY,
    name varchar2(50),
    season varchar2(20),
    genre varchar2(250),
    synopsis varchar2(250),
    lang varchar2(20),
    rating FLOAT 
);

CREATE TABLE reviews (
review_id INT PRIMARY KEY,
review_written varchar2(250),
tv_show_id INT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (tv_show_id) REFERENCES tv_show(tv_show_id)
);

CREATE TABLE cast (
cast_id INT PRIMARY KEY,
name varchar2(50),
role varchar2(20),
tv_show_id INT,
FOREIGN KEY (tv_show_id) REFERENCES tv_show(tv_show_id)
);

CREATE TABLE episodes (
episode_id INT PRIMARY KEY,
title varchar2(50),
runtime INT,
tv_show_id INT,
FOREIGN KEY (tv_show_id) REFERENCES tv_show (tv_show_id)
);

insert into users values ('1','fatima','balorant');
insert into users values ('2','junaid','hellokitty');
insert into users values ('3','saad','ali')

insert into admin values ('1','admin1','pass1');
insert into admin values ('2','admin2','pass2');

insert into tv_show values ('1','Breaking Bad','5','Action','druggy show','English',3.5);
insert into tv_show values ('2','Glee','2','Funny','singing should stop','English',1);
insert into tv_show values ('3','The Crown','4','History','please queen is dead','English',4);

insert into episodes values ('1','ep1','60','2');
insert into episodes values ('2','ep12','60','3');
insert into episodes values ('3','ep3','60','1');

insert into cast values ('1','John','Lead','1');
insert into cast values ('2','Sara','Co-Lead','3');
insert into cast values ('3','Tom','Lead','2');


insert into reviews values ('1','uhh ??','2','2');
insert into reviews values ('2','bad','1','1');
insert into reviews values ('3','good','3','3');

insert into watchlist values ('1','wc1','2','3');
insert into watchlist values ('2','wc2','1','2');
insert into watchlist values ('3','wc3','3','1');
