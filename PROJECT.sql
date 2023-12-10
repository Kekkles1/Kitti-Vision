SET SERVEROUTPUT ON;

--dropping tables
drop table tv_show;
drop table reviews;
drop table episodes;
drop table cast;
drop table deleted_history;
drop table watchlist;
drop table users;
drop table admin;

CREATE SEQUENCE SEQUENCE_USER_ID INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQUENCE_ADMIN_ID INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQUENCE_TVSHOW_ID INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQUENCE_WATCHLIST_ID INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQUENCE_REVIEW_ID INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQUENCE_CAST_ID INCREMENT BY 1 START WITH 1;

DROP SEQUENCE sequence_user_id;
DROP SEQUENCE sequence_admin_id;
DROP SEQUENCE sequence_tvshow_id;
DROP SEQUENCE sequence_watchlist_id;
DROP SEQUENCE sequence_review_id;
DROP SEQUENCE sequence_cast_id;


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

--TRIGGERS
--trigger where on inserting episode, episode count in tv table increases
CREATE OR REPLACE TRIGGER add_episode 
AFTER INSERT ON episodes
FOR EACH ROW

BEGIN
UPDATE tv_show SET episode_count=episode_count+1
WHERE tv_show.tv_show_id=:NEW.tv_show_id;
END;

-- trigger where on inserting reviews, review  count in tv table increases
CREATE OR REPLACE TRIGGER add_review
AFTER INSERT ON reviews
FOR EACH ROW

BEGIN
UPDATE tv_show SET review_count=review_count+1
WHERE tv_show.tv_show_id=:NEW.tv_show_id;
END;

--trigger where on inserting reviews, review count in users table increases
CREATE OR REPLACE TRIGGER add_review_user
AFTER INSERT ON reviews
FOR EACH ROW

BEGIN
UPDATE users SET review_count=review_count+1
WHERE users.user_id=:NEW.user_id;
END;

--PROCEDURES
--Procedure to delete User by entering user_id
CREATE OR REPLACE PROCEDURE userDelete (input_userID INT)
AS input_username varchar2(50);
input_password varchar2(50);
BEGIN
SELECT username , password
INTO input_username, input_password
FROM users
WHERE user_id=input_userID;

DELETE FROM watchlist WHERE watchlist.user_id=input_userID;
DELETE FROM reviews WHERE reviews.user_id=input_userID;
DELETE FROM users WHERE users.user_id=input_userID;
INSERT INTO deleted_history (user_id,username,password) VALUES (input_userID,input_username,input_password);
COMMIT;
DBMS_OUTPUT.PUT_LINE('DELETED USER');
EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE_APPLICATION_ERROR(-20001, 'Error deleting entry: ');
END userDelete;

begin
userDelete(23);
end userDelete;

drop procedure userDelete;

--This is for users
CREATE OR REPLACE PROCEDURE username_check (input_username varchar2)
AS username_count NUMBER;

BEGIN
SELECT count(*)
INTO username_count
FROM users
WHERE users.username=input_username;

IF username_count > 0 THEN
DBMS_OUTPUT.PUT_LINE('MATCH USERNAME');
ELSE 
RAISE_APPLICATION_ERROR(-20001, 'Username does not exist');
END IF;
END username_check;

drop procedure username_check;

BEGIN 
username_check('maliha');
END;

--This is for users
CREATE OR REPLACE PROCEDURE password_check (input_password varchar2)
AS password_count NUMBER;

BEGIN
SELECT count(*)
INTO password_count
FROM users
WHERE users.password=input_password;

IF password_count > 0 THEN
DBMS_OUTPUT.PUT_LINE('MATCH PASSWORD');
ELSE 
RAISE_APPLICATION_ERROR(-20001, 'Password does not exist');
END IF;
END password_check;

drop procedure password_check;

BEGIN 
password_check('kitten1');
end;

--This is for admins
CREATE OR REPLACE PROCEDURE admin_username (admin_username varchar2)
AS admin_count NUMBER;

BEGIN
SELECT count(*)
INTO admin_count
FROM admin
WHERE admin.username=admin_username;

IF admin_count > 0 THEN
DBMS_OUTPUT.PUT_LINE('MATCH USERNAME');
ELSE 
RAISE_APPLICATION_ERROR(-20001, 'Admin username does not exist');
END IF;
END admin_username;

select * from admin;

begin
admin_username('admin1');
end;

--This is for admins
CREATE OR REPLACE PROCEDURE admin_password (admin_password varchar2)
AS admin_count NUMBER;

BEGIN
SELECT count(*)
INTO admin_count
FROM admin
WHERE admin.password=admin_password;

IF admin_count > 0 THEN
DBMS_OUTPUT.PUT_LINE('MATCH PASSWORD');
ELSE 
RAISE_APPLICATION_ERROR(-20001, 'Admin Password does not exist');
END IF;
END admin_password;

select * from admin;

begin
admin_password('Password1');
end;


--TABLES
CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    username varchar2(50),
    password varchar2(20),
    review_count int DEFAULT 0
);

CREATE TABLE admin (
admin_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
username varchar2(50),
password varchar2(20)
);

CREATE TABLE watchlist (
    watchlist_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    name varchar2(50),
    list_length INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE tv_show (
    tv_show_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    name varchar2(50),
    season varchar2(20),
    genre varchar2(250),
    synopsis varchar2(250),
    episode_count int DEFAULT 0,
    review_count int DEFAULT 0,
    rating FLOAT 
);

CREATE TABLE reviews (
review_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
review_written varchar2(250),
tv_show_id INT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (tv_show_id) REFERENCES tv_show(tv_show_id)
);

CREATE TABLE cast (
cast_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
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

CREATE TABLE deleted_history (
user_id INT,
username varchar2 (50),
password varchar2 (50)
);

--selecting tables
select * from users;
select * from admin;
select * from cast;
select * from deleted_history;
select * from episodes;
select * from tv_show;
select * from watchlist;
select * from reviews;

--Insertion into the users tables
INSERT INTO users (username,password) VALUES ('hamza','roblox');
INSERT INTO users (username,password) VALUES ('fatima','balorant');
INSERT INTO users (username,password) VALUES ('junaid','kitten');

--Insertion into the admin tables
INSERT INTO admin (username,password) VALUES ('admin1','pass1');
INSERT INTO admin (username,password) VALUES ('admin2','pass2');
INSERT INTO admin (username,password) VALUES ('admin3','pass3');

--Insertion into the tv_shows tables
INSERT INTO tv_show(name,season,genre,synopsis,rating) VALUES ('Breaking Bad',5,'Thriller','Chemistry teacher makes meth',4.5);
INSERT INTO tv_show(name,season,genre,synopsis,rating) VALUES ('Derry Girls',7,'Funny','Girls are always funny',5.0);
INSERT INTO tv_show(name,season,genre,synopsis,rating) VALUES ('The Crown',2,'Mystery','When will the queen die?',2.5);

--Insertion into the episodes tables
INSERT INTO episodes (episode_id,title,runtime,tv_show_id) VALUES (1,'Pilot',45,1);
INSERT INTO episodes (episode_id,title,runtime,tv_show_id) VALUES (2,'make meth',50,1);
INSERT INTO episodes (episode_id,title,runtime,tv_show_id) VALUES (3,'Women',30,2);

--Insertion into reviews table
INSERT INTO reviews (review_written,tv_show_id,user_id) VALUES ('Good show',1,1);
INSERT INTO reviews (review_written,tv_show_id,user_id) VALUES ('Terrible show',3,1);
INSERT INTO reviews (review_written,tv_show_id,user_id) VALUES ('Funny show',2,2);
