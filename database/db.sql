-- Database: webnc

-- DROP DATABASE IF EXISTS webnc;

CREATE DATABASE webnc
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
	
	
-- Table: public.User

-- DROP TABLE IF EXISTS public."User";

CREATE TABLE IF NOT EXISTS public."User"
(
    "IdUser" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999 CACHE 1 ),
    "Email" character varying COLLATE pg_catalog."default" NOT NULL,
    "Pw" character varying COLLATE pg_catalog."default" NOT NULL,
    "Role" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("IdUser")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;
	
	

-- Table: public.GiaoVien

-- DROP TABLE IF EXISTS public."GiaoVien";

CREATE TABLE IF NOT EXISTS public."GiaoVien"
(
    "IdGiaoVien" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "FullName" character varying COLLATE pg_catalog."default" NOT NULL,
    "DOB" character varying COLLATE pg_catalog."default" NOT NULL,
    "Sex" character varying COLLATE pg_catalog."default" NOT NULL,
    "IdUser" integer NOT NULL,
    CONSTRAINT "GiaoVien_pkey" PRIMARY KEY ("IdGiaoVien"),
    CONSTRAINT "FK_GiaoVien_User" FOREIGN KEY ("IdUser")
        REFERENCES public."User" ("IdUser") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."GiaoVien"
    OWNER to postgres;
	
	
-- Table: public.HocSinh

-- DROP TABLE IF EXISTS public."HocSinh";

CREATE TABLE IF NOT EXISTS public."HocSinh"
(
    "idHocSinh" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "FullName" character varying COLLATE pg_catalog."default" NOT NULL,
    "DOB" date NOT NULL,
    "Sex" character varying COLLATE pg_catalog."default" NOT NULL,
    "StudentID" character varying COLLATE pg_catalog."default" NOT NULL,
    "IdUser" integer NOT NULL,
    CONSTRAINT "HocSinh_pkey" PRIMARY KEY ("idHocSinh"),
    CONSTRAINT "FK_HocSinh_User" FOREIGN KEY ("IdUser")
        REFERENCES public."User" ("IdUser") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."HocSinh"
    OWNER to postgres;