/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016/5/22 4:35:45                            */
/*==============================================================*/


create database lol default charset utf8;

use lol;

/*==============================================================*/
/* Table: admin                                                 */
/*==============================================================*/
create table admin
(
   aid                  int not null auto_increment,
   aname                varchar(100),
   email                varchar(100),
   password             varchar(100),
   issuper              int,
   addtime              datetime,
   primary key (aid)
);
insert into admin values(default,'超级管理员','admin@qq.com','admin',0,now());

/*==============================================================*/
/* Table: collect                                               */
/*==============================================================*/
create table collect
(
   cid                  int not null auto_increment,
   imgname              varchar(100),
   imgpath              varchar(100),
   imginfo              varchar(500),
   uptime               datetime,
   aid                  int,
   primary key (cid)
);

