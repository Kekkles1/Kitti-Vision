SET SERVEROUTPUT ON;

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

--Procedures
CREATE OR REPLACE PROCEDURE userDelete (input_userID iNT)
AS
BEGIN
DELETE FROM watchlist WHERE watchlist.user_id=input_userID;
DELETE FROM reviews WHERE reviews.user_id=input_userID;
DELETE FROM users WHERE users.user_id=input_userID;
COMMIT;
DBMS_OUTPUT.PUT_LINE('DELETED USER');
EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE_APPLICATION_ERROR(-20001, 'Error deleting entry: ');
END userDelete;

begin
userDelete(21);
end userDelete;

insert into users (username,password) VALUES ('fatima','balorant');
select * from users;
select * from watchlist;
select * from reviews;


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

select * from users;

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
    password varchar2(20)
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
    lang varchar2(20),
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

CREATE TABLE deleted_history (
user_id INT,
username varchar2 (50),
password varchar2 (50)
);
