prompt PL/SQL Developer Export User Objects for user ZHENGZEMIN@127.0.0.1:1521/ORCL
prompt Created by zzm on 2021年6月12日
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
  is '���������';
comment on column ZHENGZEMIN.AGENT_EVENT.id
  is 'id����';
comment on column ZHENGZEMIN.AGENT_EVENT.title
  is '����';
comment on column ZHENGZEMIN.AGENT_EVENT.content
  is '����';
comment on column ZHENGZEMIN.AGENT_EVENT.type
  is '���ͣ�1�������죻2�����ڣ�3���Ӻ�';
comment on column ZHENGZEMIN.AGENT_EVENT.agent
  is '������';
comment on column ZHENGZEMIN.AGENT_EVENT.schedule
  is '����';
comment on column ZHENGZEMIN.AGENT_EVENT.notice_way
  is '֪ͨ��ʽ��1��Bark��2��΢�ŷ��ǣ�3��qq���䣩';
comment on column ZHENGZEMIN.AGENT_EVENT.start_time
  is '��ʼʱ��';
comment on column ZHENGZEMIN.AGENT_EVENT.end_time
  is '����ʱ��';
comment on column ZHENGZEMIN.AGENT_EVENT.remarks
  is '��ע';
comment on column ZHENGZEMIN.AGENT_EVENT.create_date
  is '����ʱ��';
comment on column ZHENGZEMIN.AGENT_EVENT.update_date
  is '����ʱ��';
comment on column ZHENGZEMIN.AGENT_EVENT.del_flag
  is 'ɾ����ǣ�0��������1��ɾ����2����ˣ�';
comment on column ZHENGZEMIN.AGENT_EVENT.contact
  is '��ϵ��ʽ��noticeWayֵ��1��2��������ֻ����룻 3����qq���䣩';
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
  is '���ͱ�';
comment on column ZHENGZEMIN.BOKE.title
  is '����';
comment on column ZHENGZEMIN.BOKE.content
  is '����';
comment on column ZHENGZEMIN.BOKE.categories
  is '���';
comment on column ZHENGZEMIN.BOKE.author
  is '����';
comment on column ZHENGZEMIN.BOKE.boketime
  is '����ʱ��';
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
  is '�������±�';
comment on column ZHENGZEMIN.COMMENTS.bokeid
  is '����id';
comment on column ZHENGZEMIN.COMMENTS.commentscontent
  is '��������';
comment on column ZHENGZEMIN.COMMENTS.author
  is '����';
comment on column ZHENGZEMIN.COMMENTS.commenttime
  is '���·���ʱ��';
comment on column ZHENGZEMIN.COMMENTS.zannum
  is '���޸���';
comment on column ZHENGZEMIN.COMMENTS.loginid
  is '��¼id���ɹ������û�����';
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
  is '���޲��ͱ�';
comment on column ZHENGZEMIN.LIKE_TABLE.commentsid
  is '��������id';
comment on column ZHENGZEMIN.LIKE_TABLE.loginid
  is '��ǰ��¼��id���ɹ�����ȡ���û�����';
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
  is '��־��';
comment on column ZHENGZEMIN.LOG.username
  is '�û���';
comment on column ZHENGZEMIN.LOG.ip
  is 'ip';
comment on column ZHENGZEMIN.LOG.area
  is '��ǰ��¼�û��ĵ���';
comment on column ZHENGZEMIN.LOG.isp
  is '�豸';
comment on column ZHENGZEMIN.LOG.useragent
  is '�豸�ͺ�����';
comment on column ZHENGZEMIN.LOG.login_time
  is '��¼ʱ��';
comment on column ZHENGZEMIN.LOG.login_num
  is '��¼����';
comment on column ZHENGZEMIN.LOG.code
  is '�������ĸ��˵�';
comment on column ZHENGZEMIN.LOG.login_state
  is '��¼״̬��1���ɹ���0��ʧ�ܣ�';
comment on column ZHENGZEMIN.LOG.oldoperation
  is '������һ���˵�';
comment on column ZHENGZEMIN.LOG.operation
  is '������һ���˵�';
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
  is '�û���';
comment on column ZHENGZEMIN.LOGIN.username
  is '�û���';
comment on column ZHENGZEMIN.LOGIN.password
  is '����';
comment on column ZHENGZEMIN.LOGIN.photo
  is '��Ƭ';
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
  is '���ֱ�';
comment on column ZHENGZEMIN.MUSIC.url
  is '����·��';
comment on column ZHENGZEMIN.MUSIC.controllist
  is 'onlyOnePlaying';
comment on column ZHENGZEMIN.MUSIC.uploader
  is '�ϴ���';
comment on column ZHENGZEMIN.MUSIC.uploadtime
  is '�ϴ�ʱ��';
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
  is '���ֱ�';
comment on column ZHENGZEMIN.MUSIC_SINGER.file_name
  is '�ļ���';
comment on column ZHENGZEMIN.MUSIC_SINGER.bucket_name
  is '�ļ�������';
comment on column ZHENGZEMIN.MUSIC_SINGER.file_type
  is '�ļ����ͣ�0��ͼƬ��1�����֣�2����Ƶ��3��������';
comment on column ZHENGZEMIN.MUSIC_SINGER.file_url
  is '�ļ�URL';
comment on column ZHENGZEMIN.MUSIC_SINGER.file_name_random
  is '�ļ����ֵ����������ֹ�ļ��������ļ�������';
comment on column ZHENGZEMIN.MUSIC_SINGER.upload_mark
  is '�ļ��ϴ���ʶ��0����ɹ���1����ʧ�ܣ���';
comment on column ZHENGZEMIN.MUSIC_SINGER.user_name
  is '�û���';
comment on column ZHENGZEMIN.MUSIC_SINGER.singer_name
  is '��������';
comment on column ZHENGZEMIN.MUSIC_SINGER.create_date
  is '����ʱ��';
comment on column ZHENGZEMIN.MUSIC_SINGER.remarks
  is '��ע';
comment on column ZHENGZEMIN.MUSIC_SINGER.update_date
  is '����ʱ��';
comment on column ZHENGZEMIN.MUSIC_SINGER.del_flag
  is 'ɾ����ǣ�0��������1��ɾ����2����ˣ�';
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
  is '���ֵĸ�����';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_name
  is '�ļ���';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.bucket_name
  is '�ļ�������';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_type
  is '�ļ����ͣ�0��ͼƬ��1�����֣�2����Ƶ��3��������';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_content_type
  is '�ļ���������';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_size
  is '�ļ���С';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_url
  is '�ļ�URL';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.file_name_random
  is '�ļ����ֵ����������ֹ�ļ��������ļ�������';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.upload_mark
  is '�ļ��ϴ���ʶ��0����ɹ���1����ʧ�ܣ���';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.user_name
  is '�û���';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.singer_name
  is '��������';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.singer_song_name
  is '������';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.singer_song_type
  is '�������ͣ����壻���У�ҡ���������֣�';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.create_date
  is '����ʱ��';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.remarks
  is '��ע';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.update_date
  is '����ʱ��';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG.del_flag
  is 'ɾ����ǣ�0��������1��ɾ����2����ˣ�';
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
  is '���ֵĸ���ͼƬ��';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_name
  is '�ļ���';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.bucket_name
  is '�ļ�������';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_type
  is '�ļ����ͣ�0��ͼƬ��1�����֣�2����Ƶ��3��������';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_content_type
  is '�ļ���������';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_size
  is '�ļ���С';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_url
  is '�ļ�URL';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.file_name_random
  is '�ļ����ֵ����������ֹ�ļ��������ļ�������';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.upload_mark
  is '�ļ��ϴ���ʶ��0����ɹ���1����ʧ�ܣ���';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.user_name
  is '�û���';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.create_date
  is '����ʱ��';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.remarks
  is '��ע';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.update_date
  is '����ʱ��';
comment on column ZHENGZEMIN.MUSIC_SINGER_SONG_IMG.del_flag
  is 'ɾ����ǣ�0��������1��ɾ����2����ˣ�';
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
  is '�ݰ������';
comment on column ZHENGZEMIN.TEMPORARILYRUN.title
  is '����';
comment on column ZHENGZEMIN.TEMPORARILYRUN.content
  is '����';
comment on column ZHENGZEMIN.TEMPORARILYRUN.state
  is '״̬��1������ɣ�0���ݰ죩';
comment on column ZHENGZEMIN.TEMPORARILYRUN.categories
  is '���';
comment on column ZHENGZEMIN.TEMPORARILYRUN.author
  is '����';
comment on column ZHENGZEMIN.TEMPORARILYRUN.temporarilyruntime
  is '�ϴ�ʱ��';
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
