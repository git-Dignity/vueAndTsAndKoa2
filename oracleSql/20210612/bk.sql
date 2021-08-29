prompt PL/SQL Developer Export User Objects for user ZHENGZEMIN@127.0.0.1:1521/ORCL
prompt Created by zzm on 2021å¹´6æœˆ12æ—¥
set define off
spool bk.log

prompt
prompt Creating table AGENT_EVENT
prompt ==========================
prompt
create table ZHENGZEMIN.AGENT_EVENT
(
  id          VARCHAR2(64) not null,
  title       VARCHAR2(100) not null,
  content     VARCHAR2(4000) not null,
  type        VARCHAR2(20) default 2,
  agent       VARCHAR2(100),
  schedule    NUMBER(3),
  notice_way  NUMBER(1) default 1,
  start_time  DATE default sysdate,
  end_time    DATE not null,
  remarks     VARCHAR2(1000),
  create_date DATE default sysdate,
  update_date DATE,
  del_flag    NUMBER(1) default 0,
  contact     VARCHAR2(30)
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.AGENT_EVENT
  is '´ú°ìÊÂÏî±í';
comment on column ZHENGZEMIN.AGENT_EVENT.id
  is 'idÖ÷¼ü';
comment on column ZHENGZEMIN.AGENT_EVENT.title
  is '±êÌâ';
comment on column ZHENGZEMIN.AGENT_EVENT.content
  is 'ÄÚÈÝ';
comment on column ZHENGZEMIN.AGENT_EVENT.type
  is 'ÀàÐÍ£¨1£ºÕâÁ½Ìì£»2£º½üÆÚ£»3£ºÑÓºó£©';
comment on column ZHENGZEMIN.AGENT_EVENT.agent
  is '´ú°ìÕß';
comment on column ZHENGZEMIN.AGENT_EVENT.schedule
  is '½ø¶È';
comment on column ZHENGZEMIN.AGENT_EVENT.notice_way
  is 'Í¨Öª·½Ê½£¨1£ºBark£»2£ºÎ¢ÐÅ·½ÌÇ£»3£ºqqÓÊÏä£©';
comment on column ZHENGZEMIN.AGENT_EVENT.start_time
  is '¿ªÊ¼Ê±¼ä';
comment on column ZHENGZEMIN.AGENT_EVENT.end_time
  is '½áÊøÊ±¼ä';
comment on column ZHENGZEMIN.AGENT_EVENT.remarks
  is '±¸×¢';
comment on column ZHENGZEMIN.AGENT_EVENT.create_date
  is '´´½¨Ê±¼ä';
comment on column ZHENGZEMIN.AGENT_EVENT.update_date
  is '¸üÐÂÊ±¼ä';
comment on column ZHENGZEMIN.AGENT_EVENT.del_flag
  is 'É¾³ý±ê¼Ç£¨0£ºÕý³££»1£ºÉ¾³ý£»2£ºÉóºË£©';
comment on column ZHENGZEMIN.AGENT_EVENT.contact
  is 'ÁªÏµ·½Ê½£¨noticeWayÖµµÄ1¡¢2£º´æµÄÊÇÊÖ»úºÅÂë£» 3£º´æqqÓÊÏä£©';
alter table ZHENGZEMIN.AGENT_EVENT
  add primary key (ID)
  using index 
  tablespace BLOG200601
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table BOKE
prompt ===================
prompt
create table ZHENGZEMIN.BOKE
(
  id         VARCHAR2(64) not null,
  title      VARCHAR2(100) not null,
  content    VARCHAR2(3000) not null,
  categories VARCHAR2(50) not null,
  author     VARCHAR2(50) not null,
  boketime   VARCHAR2(50) not null
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.BOKE
  is '²©¿Í±í';
comment on column ZHENGZEMIN.BOKE.title
  is '±êÌâ';
comment on column ZHENGZEMIN.BOKE.content
  is 'ÄÚÈÝ';
comment on column ZHENGZEMIN.BOKE.categories
  is 'Àà±ð';
comment on column ZHENGZEMIN.BOKE.author
  is '×÷Õß';
comment on column ZHENGZEMIN.BOKE.boketime
  is '´´½¨Ê±¼ä';
alter table ZHENGZEMIN.BOKE
  add primary key (ID)
  using index 
  tablespace BLOG200601
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table COMMENTS
prompt =======================
prompt
create table ZHENGZEMIN.COMMENTS
(
  id              VARCHAR2(64) not null,
  bokeid          VARCHAR2(64) not null,
  commentscontent VARCHAR2(3000) not null,
  author          VARCHAR2(50) not null,
  commenttime     VARCHAR2(50) not null,
  zannum          VARCHAR2(100),
  loginid         VARCHAR2(64)
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.COMMENTS
  is '²©¿ÍÎÄÕÂ±í';
comment on column ZHENGZEMIN.COMMENTS.bokeid
  is 'ÎÄÕÂid';
comment on column ZHENGZEMIN.COMMENTS.commentscontent
  is 'ÎÄÕÂÄÚÈÝ';
comment on column ZHENGZEMIN.COMMENTS.author
  is '×÷Õß';
comment on column ZHENGZEMIN.COMMENTS.commenttime
  is 'ÎÄÕÂ·¢²¼Ê±¼ä';
comment on column ZHENGZEMIN.COMMENTS.zannum
  is 'µãÔÞ¸öÊý';
comment on column ZHENGZEMIN.COMMENTS.loginid
  is 'µÇÂ¼id£¨¿É¹ØÁªµ½ÓÃ»§Ãû£©';
alter table ZHENGZEMIN.COMMENTS
  add primary key (ID)
  using index 
  tablespace BLOG200601
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table LIKE_TABLE
prompt =========================
prompt
create table ZHENGZEMIN.LIKE_TABLE
(
  id         VARCHAR2(64) not null,
  commentsid VARCHAR2(64) not null,
  loginid    VARCHAR2(64) not null
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.LIKE_TABLE
  is 'µãÔÞ²©¿Í±í';
comment on column ZHENGZEMIN.LIKE_TABLE.commentsid
  is '²©¿ÍÎÄÕÂid';
comment on column ZHENGZEMIN.LIKE_TABLE.loginid
  is 'µ±Ç°µÇÂ¼µÄid£¨¿É¹ØÁª»ñÈ¡µ½ÓÃ»§Ãû£©';
alter table ZHENGZEMIN.LIKE_TABLE
  add primary key (ID)
  using index 
  tablespace BLOG200601
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table LOG
prompt ==================
prompt
create table ZHENGZEMIN.LOG
(
  id           VARCHAR2(64) not null,
  username     VARCHAR2(255) not null,
  ip           VARCHAR2(255) not null,
  area         VARCHAR2(255) not null,
  isp          VARCHAR2(255) not null,
  useragent    VARCHAR2(255) not null,
  login_time   VARCHAR2(255) not null,
  login_num    VARCHAR2(255) not null,
  code         VARCHAR2(255) not null,
  login_state  NUMBER(20) not null,
  oldoperation VARCHAR2(255),
  operation    VARCHAR2(255)
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 320K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.LOG
  is 'ÈÕÖ¾±í';
comment on column ZHENGZEMIN.LOG.username
  is 'ÓÃ»§Ãû';
comment on column ZHENGZEMIN.LOG.ip
  is 'ip';
comment on column ZHENGZEMIN.LOG.area
  is 'µ±Ç°µÇÂ¼ÓÃ»§µÄµØÇø';
comment on column ZHENGZEMIN.LOG.isp
  is 'Éè±¸';
comment on column ZHENGZEMIN.LOG.useragent
  is 'Éè±¸ÐÍºÅÏêÇé';
comment on column ZHENGZEMIN.LOG.login_time
  is 'µÇÂ¼Ê±¼ä';
comment on column ZHENGZEMIN.LOG.login_num
  is 'µÇÂ¼´ÎÊý';
comment on column ZHENGZEMIN.LOG.code
  is '²Ù×÷ÁËÄÄ¸ö²Ëµ¥';
comment on column ZHENGZEMIN.LOG.login_state
  is 'µÇÂ¼×´Ì¬£¨1£º³É¹¦£¬0£ºÊ§°Ü£©';
comment on column ZHENGZEMIN.LOG.oldoperation
  is '²Ù×÷ÉÏÒ»¸ö²Ëµ¥';
comment on column ZHENGZEMIN.LOG.operation
  is '²Ù×÷ÏÂÒ»¸ö²Ëµ¥';
alter table ZHENGZEMIN.LOG
  add primary key (ID)
  using index 
  tablespace BLOG200601
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table LOGIN
prompt ====================
prompt
create table ZHENGZEMIN.LOGIN
(
  id       VARCHAR2(64) not null,
  username VARCHAR2(100) not null,
  password VARCHAR2(255) not null,
  photo    VARCHAR2(255)
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.LOGIN
  is 'ÓÃ»§±í';
comment on column ZHENGZEMIN.LOGIN.username
  is 'ÓÃ»§Ãû';
comment on column ZHENGZEMIN.LOGIN.password
  is 'ÃÜÂë';
comment on column ZHENGZEMIN.LOGIN.photo
  is 'ÕÕÆ¬';
alter table ZHENGZEMIN.LOGIN
  add primary key (ID)
  using index 
  tablespace BLOG200601
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table MUSIC
prompt ====================
prompt
create table ZHENGZEMIN.MUSIC
(
  id          VARCHAR2(64) not null,
  url         VARCHAR2(255) not null,
  controllist VARCHAR2(255) not null,
  uploader    VARCHAR2(255) not null,
  uploadtime  VARCHAR2(255)
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.MUSIC
  is 'ÒôÀÖ±í';
comment on column ZHENGZEMIN.MUSIC.url
  is 'ÒôÀÖÂ·¾¶';
comment on column ZHENGZEMIN.MUSIC.controllist
  is 'onlyOnePlaying';
comment on column ZHENGZEMIN.MUSIC.uploader
  is 'ÉÏ´«Õß';
comment on column ZHENGZEMIN.MUSIC.uploadtime
  is 'ÉÏ´«Ê±¼ä';
alter table ZHENGZEMIN.MUSIC
  add primary key (ID)
  using index 
  tablespace BLOG200601
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table MUSIC_SINGER
prompt ===========================
prompt
create table ZHENGZEMIN.MUSIC_SINGER
(
  id               VARCHAR2(64),
  file_name        VARCHAR2(1000),
  bucket_name      VARCHAR2(63),
  file_type        NUMBER(1),
  file_url         VARCHAR2(100),
  file_name_random VARCHAR2(30),
  upload_mark      NUMBER(1),
  user_name        VARCHAR2(100),
  singer_name      VARCHAR2(64),
  create_date      DATE,
  remarks          VARCHAR2(200),
  update_date      DATE,
  del_flag         VARCHAR2(1)
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.MUSIC_SINGER
  is '¸èÊÖ±í';
comment on column ZHENGZEMIN.MUSIC_SINGER.file_name
  is 'ÎÄ¼þÃû';
comment on column ZHENGZEMIN.MUSIC_SINGER.bucket_name
  is 'ÎÄ¼þ¼ÐÃû×Ö';
comment on column ZHENGZEMIN.MUSIC_SINGER.file_type
  is 'ÎÄ¼þÀàÐÍ£¨0£ºÍ¼Æ¬£»1£ºÒôÀÖ£»2£ºÊÓÆµ£»3£ºÆäËû£©';
comment on column ZHENGZEMIN.MUSIC_SINGER.file_url
  is 'ÎÄ¼þURL';
comment on column ZHENGZEMIN.MUSIC_SINGER.file_name_random
  is 'ÎÄ¼þÃû×ÖµÄËæ»úÊý£¨·ÀÖ¹ÎÄ¼þ·þÎñÆ÷ÎÄ¼þÖØÃû£©';
comment on column ZHENGZEMIN.MUSIC_SINGER.upload_mark
  is 'ÎÄ¼þÉÏ´«±êÊ¶£¨0´ú±í³É¹¦£¬1´ú±íÊ§°Ü£©£©';
comment on column ZHENGZEMIN.MUSIC_SINGER.user_name
  is 'ÓÃ»§Ãû';
comment on column ZHENGZEMIN.MUSIC_SINGER.singer_name
  is '¸èÊÖÃû×Ö';
comment on column ZHENGZEMIN.MUSIC_SINGER.create_date
  is '´´½¨Ê±¼ä';
comment on column ZHENGZEMIN.MUSIC_SINGER.remarks
  is '±¸×¢';
comment on column ZHENGZEMIN.MUSIC_SINGER.update_date
  is '¸üÐÂÊ±¼ä';
comment on column ZHENGZEMIN.MUSIC_SINGER.del_flag
  is 'É¾³ý±ê¼Ç£¨0£ºÕý³££»1£ºÉ¾³ý£»2£ºÉóºË£©';
alter table ZHENGZEMIN.MUSIC_SINGER
  add constraint CHECK_1
  check (length(bucket_name) between 3 and 63);

prompt
prompt Creating table MUSIC_SINGER_SONG
prompt ================================
prompt
create table ZHENGZEMIN.MUSIC_SINGER_SONG
(
  id                VARCHAR2(64),
  file_name         VARCHAR2(1000),
  bucket_name       VARCHAR2(63),
  file_type         NUMBER(1),
  file_content_type VARCHAR2(30),
  file_size         VARCHAR2(100),
  file_url          VARCHAR2(100),
  file_name_random  VARCHAR2(30),
  upload_mark       NUMBER(1),
  user_name         VARCHAR2(100),
  singer_name       VARCHAR2(64),
  singer_song_name  VARCHAR2(64),
  singer_song_type  VARCHAR2(64),
  create_date       DATE,
  remarks           VARCHAR2(200),
  update_date       DATE,
  del_flag          VARCHAR2(1)
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 128K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.MUSIC_SINGER_SONG
  is '¸èÊÖµÄ¸èÇú±í';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_name
  is 'ÎÄ¼þÃû';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.bucket_name
  is 'ÎÄ¼þ¼ÐÃû×Ö';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_type
  is 'ÎÄ¼þÀàÐÍ£¨0£ºÍ¼Æ¬£»1£ºÒôÀÖ£»2£ºÊÓÆµ£»3£ºÆäËû£©';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_content_type
  is 'ÎÄ¼þÄÚÈÝÀàÐÍ';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_size
  is 'ÎÄ¼þ´óÐ¡';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_url
  is 'ÎÄ¼þURL';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_name_random
  is 'ÎÄ¼þÃû×ÖµÄËæ»úÊý£¨·ÀÖ¹ÎÄ¼þ·þÎñÆ÷ÎÄ¼þÖØÃû£©';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.upload_mark
  is 'ÎÄ¼þÉÏ´«±êÊ¶£¨0´ú±í³É¹¦£¬1´ú±íÊ§°Ü£©£©';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.user_name
  is 'ÓÃ»§Ãû';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.singer_name
  is '¸èÊÖÃû×Ö';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.singer_song_name
  is '¸èÇúÃû';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.singer_song_type
  is '¸èÇúÀàÐÍ£¨Ãñ×å£»Á÷ÐÐ£»Ò¡¹ö£»ÇáÒôÀÖ£©';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.create_date
  is '´´½¨Ê±¼ä';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.remarks
  is '±¸×¢';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.update_date
  is '¸üÐÂÊ±¼ä';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.del_flag
  is 'É¾³ý±ê¼Ç£¨0£ºÕý³££»1£ºÉ¾³ý£»2£ºÉóºË£©';
alter table ZHENGZEMIN.MUSIC_SINGER_SONG
  add constraint CHECK_MUSIC_SINGER_SONG
  check (length(bucket_name) between 3 and 63);

prompt
prompt Creating table MUSIC_SINGER_SONG_IMG
prompt ====================================
prompt
create table ZHENGZEMIN.MUSIC_SINGER_SONG_IMG
(
  id                VARCHAR2(64),
  file_name         VARCHAR2(1000),
  bucket_name       VARCHAR2(63),
  file_type         NUMBER(1),
  file_content_type VARCHAR2(30),
  file_size         VARCHAR2(100),
  file_url          VARCHAR2(100),
  file_name_random  VARCHAR2(30),
  upload_mark       NUMBER(1),
  user_name         VARCHAR2(100),
  create_date       DATE,
  remarks           VARCHAR2(200),
  update_date       DATE,
  del_flag          VARCHAR2(1)
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.MUSIC_SINGER_SONG_IMG
  is '¸èÊÖµÄ¸èÇúÍ¼Æ¬±í';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_name
  is 'ÎÄ¼þÃû';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.bucket_name
  is 'ÎÄ¼þ¼ÐÃû×Ö';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_type
  is 'ÎÄ¼þÀàÐÍ£¨0£ºÍ¼Æ¬£»1£ºÒôÀÖ£»2£ºÊÓÆµ£»3£ºÆäËû£©';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_content_type
  is 'ÎÄ¼þÄÚÈÝÀàÐÍ';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_size
  is 'ÎÄ¼þ´óÐ¡';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_url
  is 'ÎÄ¼þURL';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_name_random
  is 'ÎÄ¼þÃû×ÖµÄËæ»úÊý£¨·ÀÖ¹ÎÄ¼þ·þÎñÆ÷ÎÄ¼þÖØÃû£©';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.upload_mark
  is 'ÎÄ¼þÉÏ´«±êÊ¶£¨0´ú±í³É¹¦£¬1´ú±íÊ§°Ü£©£©';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.user_name
  is 'ÓÃ»§Ãû';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.create_date
  is '´´½¨Ê±¼ä';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.remarks
  is '±¸×¢';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.update_date
  is '¸üÐÂÊ±¼ä';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.del_flag
  is 'É¾³ý±ê¼Ç£¨0£ºÕý³££»1£ºÉ¾³ý£»2£ºÉóºË£©';
alter table ZHENGZEMIN.MUSIC_SINGER_SONG_IMG
  add constraint CHECK_MUSIC_SINGER_SONG_IMG
  check (length(bucket_name) between 3 and 63);

prompt
prompt Creating table TEMPORARILYRUN
prompt =============================
prompt
create table ZHENGZEMIN.TEMPORARILYRUN
(
  id                 VARCHAR2(64) not null,
  title              VARCHAR2(255) not null,
  content            VARCHAR2(255) not null,
  state              VARCHAR2(255) not null,
  categories         VARCHAR2(255) not null,
  author             VARCHAR2(255) not null,
  temporarilyruntime VARCHAR2(255) not null
)
tablespace BLOG200601
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table ZHENGZEMIN.TEMPORARILYRUN
  is 'ÔÝ°ìÈÎÎñ±í';
comment on column ZHENGZEMIN.TEMPORARILYRUN.title
  is '±êÌâ';
comment on column ZHENGZEMIN.TEMPORARILYRUN.content
  is 'ÄÚÈÝ';
comment on column ZHENGZEMIN.TEMPORARILYRUN.state
  is '×´Ì¬£¨1£ºÒÑÍê³É£¬0£ºÔÝ°ì£©';
comment on column ZHENGZEMIN.TEMPORARILYRUN.categories
  is 'Àà±ð';
comment on column ZHENGZEMIN.TEMPORARILYRUN.author
  is '×÷Õß';
comment on column ZHENGZEMIN.TEMPORARILYRUN.temporarilyruntime
  is 'ÉÏ´«Ê±¼ä';
alter table ZHENGZEMIN.TEMPORARILYRUN
  add primary key (ID)
  using index 
  tablespace BLOG200601
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );


prompt Done
spool off
set define on
