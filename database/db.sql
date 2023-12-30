-- Table: public.User

-- DROP TABLE IF EXISTS public."User";

CREATE TABLE IF NOT EXISTS public."User"
(
    "idUser" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "Email" character varying COLLATE pg_catalog."default" NOT NULL,
    "Pw" character varying COLLATE pg_catalog."default",
    "FullName" character varying COLLATE pg_catalog."default",
    "DOB" date,
    "Sex" character varying COLLATE pg_catalog."default",
    "Phone" character varying COLLATE pg_catalog."default",
    "Role" integer,
    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;


-- Table: public.HocSinh

-- DROP TABLE IF EXISTS public."HocSinh";

CREATE TABLE IF NOT EXISTS public."HocSinh"
(
    "idHocSinh" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "idUser" integer NOT NULL,
    "StudentId" character varying COLLATE pg_catalog."default",
    CONSTRAINT "HocSinh_pkey" PRIMARY KEY ("idHocSinh"),
    CONSTRAINT "FK_HocSinh_User" FOREIGN KEY ("idUser")
        REFERENCES public."User" ("idUser") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."HocSinh"
    OWNER to postgres;



-- Table: public.GiaoVien

-- DROP TABLE IF EXISTS public."GiaoVien";

CREATE TABLE IF NOT EXISTS public."GiaoVien"
(
    "idGiaoVien" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "idUser" integer NOT NULL,
    CONSTRAINT "GiaoVien_pkey" PRIMARY KEY ("idGiaoVien"),
    CONSTRAINT "FK_GiaoVien_User" FOREIGN KEY ("idUser")
        REFERENCES public."User" ("idUser") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."GiaoVien"
    OWNER to postgres;


-- Table: public.LopHoc

-- DROP TABLE IF EXISTS public."LopHoc";

CREATE TABLE IF NOT EXISTS public."LopHoc"
(
    "idLop" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "TenLop" character varying COLLATE pg_catalog."default" NOT NULL,
    "ChuDe" character varying COLLATE pg_catalog."default",
    "Phong" character varying COLLATE pg_catalog."default",
    "MaLop" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "LopHoc_pkey" PRIMARY KEY ("idLop")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."LopHoc"
    OWNER to postgres;


-- Table: public.GiaoVienLopHoc

-- DROP TABLE IF EXISTS public."GiaoVienLopHoc";

CREATE TABLE IF NOT EXISTS public."GiaoVienLopHoc"
(
    "idLop" integer NOT NULL,
    "idGiaoVien" integer NOT NULL,
    CONSTRAINT "GiaoVienLopHoc_pkey" PRIMARY KEY ("idLop", "idGiaoVien"),
    CONSTRAINT "FK_GVLH_GiaoVien" FOREIGN KEY ("idGiaoVien")
        REFERENCES public."GiaoVien" ("idGiaoVien") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_GVLH_LopHoc" FOREIGN KEY ("idLop")
        REFERENCES public."LopHoc" ("idLop") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."GiaoVienLopHoc"
    OWNER to postgres;


-- Table: public.HocSinhLopHoc

-- DROP TABLE IF EXISTS public."HocSinhLopHoc";

CREATE TABLE IF NOT EXISTS public."HocSinhLopHoc"
(
    "idLop" integer NOT NULL,
    "idHocSinh" integer NOT NULL,
    CONSTRAINT "HocSinhLopHoc_pkey" PRIMARY KEY ("idLop", "idHocSinh"),
    CONSTRAINT "FK_HSLH_HocSinh" FOREIGN KEY ("idHocSinh")
        REFERENCES public."HocSinh" ("idHocSinh") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_HSLH_LopHoc" FOREIGN KEY ("idLop")
        REFERENCES public."LopHoc" ("idLop") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."HocSinhLopHoc"
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public."CotDiem"
(
    "idCotDiem" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "idLop" integer NOT NULL,
    "TenCotDiem" character varying COLLATE pg_catalog."default" NOT NULL,
    "PhanTramDiem" integer NOT NULL,
    CONSTRAINT "CotDiem_pkey" PRIMARY KEY ("idCotDiem", "idLop"),
    CONSTRAINT "FK_CotDiem_LopHoc" FOREIGN KEY ("idLop")
        REFERENCES public."LopHoc" ("idLop") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CotDiem"
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public."BangDiemThanhPhan"
(
    "idHocSinh" integer NOT NULL,
    "idCotDiem" integer NOT NULL,
    "idLop" integer NOT NULL,
    "Diem" numeric NOT NULL,
    CONSTRAINT "BangDiemThanhPhan_pkey" PRIMARY KEY ("idHocSinh", "idCotDiem", "idLop"),
    CONSTRAINT "FK_BangDiemThanhPha_HocSinh" FOREIGN KEY ("idHocSinh")
        REFERENCES public."HocSinh" ("idHocSinh") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_BangDiemThanhPhan_CotDiem" FOREIGN KEY ("idCotDiem", "idLop")
        REFERENCES public."CotDiem" ("idCotDiem", "idLop") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."BangDiemThanhPhan"
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public."PhucKhao"
(
    "idPhucKhao" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "IdUser" integer NOT NULL,
    "ThoiGian" date NOT NULL,
    "idCotDiem" integer NOT NULL,
    "idLop" integer NOT NULL,
    "NoiDung" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PhucKhao_pkey" PRIMARY KEY ("idPhucKhao", "IdUser"),
    CONSTRAINT "FK_PhucKhao_CotDiem" FOREIGN KEY ("idCotDiem", "idLop")
        REFERENCES public."CotDiem" ("idCotDiem", "idLop") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "FK_PhucKhao_User" FOREIGN KEY ("IdUser")
        REFERENCES public."User" ("idUser") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."PhucKhao"
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public."ThongBaoGiaoVien"
(
    "idThongBao" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "idUser" integer NOT NULL,
    "idPhucKhao" integer NOT NULL,
    "ThoiGian" date NOT NULL,
    CONSTRAINT "ThongBaoGiaoVien_pkey" PRIMARY KEY ("idThongBao", "idUser", "idPhucKhao"),
    CONSTRAINT "FK_ThongBaoGIaoVien_PhucKhao" FOREIGN KEY ("idUser", "idPhucKhao")
        REFERENCES public."PhucKhao" ("IdUser", "idPhucKhao") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ThongBaoGiaoVien"
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public."ThongBaoHocSinh"
(
    "idThongBao" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "idUser" integer NOT NULL,
    "idPhucKhao" integer NOT NULL,
    "ThoiGian" date NOT NULL,
    CONSTRAINT "ThongBaoHocSinh_pkey" PRIMARY KEY ("idThongBao", "idUser", "idPhucKhao"),
    CONSTRAINT "FK_ThongBaoHocSinh_PhucKhao" FOREIGN KEY ("idUser", "idPhucKhao")
        REFERENCES public."PhucKhao" ("IdUser", "idPhucKhao") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ThongBaoHocSinh"
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public."BanAccount"
(
    "idUser" integer NOT NULL,
    "ThoiGianKhoa" date NOT NULL,
    "ThoiHanKhoa" date NOT NULL,
    CONSTRAINT "BanAccount_pkey" PRIMARY KEY ("idUser")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."BanAccount"
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public."NoiDungTraoDoi"
(
    "idTraoDoi" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 100 MINVALUE 1 MAXVALUE 99999 CACHE 1 ),
    "idPhucKhao" integer NOT NULL,
    "idUser" integer NOT NULL,
    "TraoDoi" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "NoiDungTraoDoi_pkey" PRIMARY KEY ("idTraoDoi", "idPhucKhao", "idUser"),
    CONSTRAINT "FK_NoiDungTraoDoi_PhucKhao" FOREIGN KEY ("idPhucKhao", "idUser")
        REFERENCES public."PhucKhao" ("idPhucKhao", "IdUser") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."NoiDungTraoDoi"
    OWNER to postgres;