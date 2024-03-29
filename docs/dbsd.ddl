
CREATE TABLE CUSTOMER_TYPE
(
	CUSTOMER_TYPE_ID     INTEGER NOT NULL ,
	CUSTOMER_TYPE_NAME   VARCHAR2(15) NOT NULL 
);



CREATE UNIQUE INDEX XPKCUSTOMER_TYPE ON CUSTOMER_TYPE
(CUSTOMER_TYPE_ID   ASC);



ALTER TABLE CUSTOMER_TYPE
	ADD CONSTRAINT  XPKCUSTOMER_TYPE PRIMARY KEY (CUSTOMER_TYPE_ID);



CREATE TABLE FEE
(
	THEATER_TYPE_ID      INTEGER NOT NULL ,
	CUSTOMER_TYPE_ID     INTEGER NOT NULL ,
	MOVIE_FEE            INTEGER NOT NULL 
);



CREATE UNIQUE INDEX XPKFEE ON FEE
(THEATER_TYPE_ID   ASC,CUSTOMER_TYPE_ID   ASC);



ALTER TABLE FEE
	ADD CONSTRAINT  XPKFEE PRIMARY KEY (THEATER_TYPE_ID,CUSTOMER_TYPE_ID);



CREATE TABLE MOVIE
(
	MOVIE_ID             INTEGER NOT NULL ,
	MOVIE_NAME           VARCHAR2(60) NOT NULL ,
	MOVIE_TIME           DATE NULL ,
	MOVIE_DESC           VARCHAR2(4000) NULL ,
	MOVIE_DISTR          VARCHAR2(60) NULL ,
	MOVIE_RELEASE        DATE NULL ,
	MOVIE_GEN            VARCHAR2(60) NULL ,
	SHOW_TOTAL_COUNT     INTEGER DEFAULT  0  NOT NULL ,
	DIRECTORS            VARCHAR2(60) NULL ,
	ACTORS               VARCHAR2(300) NULL ,
	POSTER_URL           VARCHAR2(500) NULL ,
	MOVIE_GRADE          CHAR(2) NULL 
);



CREATE UNIQUE INDEX XPKMOVIE ON MOVIE
(MOVIE_ID   ASC);



ALTER TABLE MOVIE
	ADD CONSTRAINT  XPKMOVIE PRIMARY KEY (MOVIE_ID);



CREATE TABLE PAY
(
	PAY_ID               INTEGER NOT NULL ,
	PAY_TYPE             INTEGER DEFAULT  1  NOT NULL ,
	PAY_STATE            INTEGER DEFAULT  1  NOT NULL ,
	PAY_PRICE            INTEGER NULL ,
	PAY_APRV_NUM         INTEGER NULL ,
	PAY_DATE             DATE NULL 
);



CREATE UNIQUE INDEX XPKPAY ON PAY
(PAY_ID   ASC);



ALTER TABLE PAY
	ADD CONSTRAINT  XPKPAY PRIMARY KEY (PAY_ID);



CREATE TABLE SEAT
(
	SEAT_ID              INTEGER NOT NULL ,
	SEAT_ROW             INTEGER NOT NULL ,
	SEAT_COL             INTEGER NOT NULL ,
	THEATER_ID           INTEGER NOT NULL ,
	SEAT_TYPE            INTEGER DEFAULT  1  NULL 
);



CREATE UNIQUE INDEX XPKSEAT ON SEAT
(SEAT_ID   ASC);



ALTER TABLE SEAT
	ADD CONSTRAINT  XPKSEAT PRIMARY KEY (SEAT_ID);



CREATE TABLE SHOW
(
	SHOW_ID              INTEGER NOT NULL ,
	THEATER_ID           INTEGER NOT NULL ,
	SHOW_START_TIME      DATE NOT NULL ,
	SHOW_COUNT           INTEGER NOT NULL ,
	MOVIE_ID             INTEGER NOT NULL 
);



CREATE UNIQUE INDEX XPKSHOW ON SHOW
(SHOW_ID   ASC);



ALTER TABLE SHOW
	ADD CONSTRAINT  XPKSHOW PRIMARY KEY (SHOW_ID);



CREATE TABLE THEATER
(
	THEATER_ID           INTEGER NOT NULL ,
	THEATER_TYPE_ID      INTEGER DEFAULT  1  NOT NULL ,
	THEATER_ROW          INTEGER DEFAULT  16  NOT NULL ,
	THEATER_COL          INTEGER DEFAULT  24  NOT NULL ,
	THEATER_CAP          INTEGER NOT NULL ,
	THEATER_NAME         VARCHAR2(30) NULL 
);



CREATE UNIQUE INDEX XPKTHEATER ON THEATER
(THEATER_ID   ASC);



ALTER TABLE THEATER
	ADD CONSTRAINT  XPKTHEATER PRIMARY KEY (THEATER_ID);



CREATE TABLE THEATER_TYPE
(
	THEATER_TYPE_ID      INTEGER NOT NULL ,
	THEATER_TYPE_NAME    VARCHAR2(30) NOT NULL 
);



CREATE UNIQUE INDEX XPKTHEATER_TYPE ON THEATER_TYPE
(THEATER_TYPE_ID   ASC);



ALTER TABLE THEATER_TYPE
	ADD CONSTRAINT  XPKTHEATER_TYPE PRIMARY KEY (THEATER_TYPE_ID);



CREATE TABLE TICKET
(
	TICKET_ID            INTEGER NOT NULL ,
	TICKET_STATE         INTEGER DEFAULT  1  NOT NULL ,
	PAY_ID               INTEGER NOT NULL ,
	SEAT_ID              INTEGER NOT NULL ,
	USR_ID               VARCHAR2(16) NOT NULL ,
	SHOW_ID              INTEGER NOT NULL ,
	CUSTOMER_TYPE_ID     INTEGER NOT NULL 
);



CREATE UNIQUE INDEX XPKTICKET ON TICKET
(TICKET_ID   ASC);



ALTER TABLE TICKET
	ADD CONSTRAINT  XPKTICKET PRIMARY KEY (TICKET_ID);



CREATE TABLE USR
(
	USR_ID               VARCHAR2(16) NOT NULL ,
	USR_NAME             VARCHAR2(30) NOT NULL ,
	USR_EMAIL            VARCHAR2(50) NOT NULL ,
	USR_PASSWORD         CHAR(64) NOT NULL ,
	USR_POINT            INTEGER DEFAULT  0  NULL ,
	USR_TYPE             INTEGER DEFAULT  1  NOT NULL 
);



CREATE UNIQUE INDEX XPKUSR ON USR
(USR_ID   ASC);



ALTER TABLE USR
	ADD CONSTRAINT  XPKUSR PRIMARY KEY (USR_ID);



ALTER TABLE FEE
	ADD (CONSTRAINT R_14 FOREIGN KEY (CUSTOMER_TYPE_ID) REFERENCES CUSTOMER_TYPE (CUSTOMER_TYPE_ID));



ALTER TABLE FEE
	ADD (CONSTRAINT R_18 FOREIGN KEY (THEATER_TYPE_ID) REFERENCES THEATER_TYPE (THEATER_TYPE_ID));



ALTER TABLE SEAT
	ADD (CONSTRAINT R_5 FOREIGN KEY (THEATER_ID) REFERENCES THEATER (THEATER_ID));



ALTER TABLE SHOW
	ADD (CONSTRAINT R_3 FOREIGN KEY (THEATER_ID) REFERENCES THEATER (THEATER_ID));



ALTER TABLE SHOW
	ADD (CONSTRAINT R_2 FOREIGN KEY (MOVIE_ID) REFERENCES MOVIE (MOVIE_ID));



ALTER TABLE THEATER
	ADD (CONSTRAINT R_19 FOREIGN KEY (THEATER_TYPE_ID) REFERENCES THEATER_TYPE (THEATER_TYPE_ID));



ALTER TABLE TICKET
	ADD (CONSTRAINT R_4 FOREIGN KEY (SHOW_ID) REFERENCES SHOW (SHOW_ID));



ALTER TABLE TICKET
	ADD (CONSTRAINT R_6 FOREIGN KEY (SEAT_ID) REFERENCES SEAT (SEAT_ID));



ALTER TABLE TICKET
	ADD (CONSTRAINT R_7 FOREIGN KEY (USR_ID) REFERENCES USR (USR_ID));



ALTER TABLE TICKET
	ADD (CONSTRAINT R_10 FOREIGN KEY (PAY_ID) REFERENCES PAY (PAY_ID));



ALTER TABLE TICKET
	ADD (CONSTRAINT R_15 FOREIGN KEY (CUSTOMER_TYPE_ID) REFERENCES CUSTOMER_TYPE (CUSTOMER_TYPE_ID));


