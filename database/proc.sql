------------------------------------------------------------------------proc thêm học sinh vào 1 lớp học 

CREATE OR REPLACE PROCEDURE public.addstudent(
    IN iduser integer,
    IN malop character)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    idHocSinh_in INTEGER;
    idLop_in INTEGER;
BEGIN
    -- Check if iduser already exists in HocSinh table
    SELECT "idHocSinh" INTO idHocSinh_in FROM public."HocSinh" WHERE "idUser" = iduser LIMIT 1;

    -- If iduser does not exist, insert into HocSinh table
    IF idHocSinh_in IS NULL THEN
        INSERT INTO public."HocSinh"("idUser") VALUES (iduser);
        SELECT "idHocSinh" INTO idHocSinh_in FROM public."HocSinh" WHERE "idUser" = iduser LIMIT 1;
    END IF;

    -- SELECT idLophoc in LopHoc table and retrieve idLop
    SELECT "idLop" INTO idLop_in FROM public."LopHoc" WHERE "MaLop" = malop LIMIT 1;

    -- INSERT INTO HocSinhLopHoc table
    INSERT INTO public."HocSinhLopHoc"("idLop", "idHocSinh") VALUES (idLop_in, idHocSinh_in);

    COMMIT;
END; 
$BODY$;

-----------------------------------------------------------------------proc thêm giáo viên vào 1 lớp học
CREATE OR REPLACE PROCEDURE public.addteacher(
	IN iduser integer,
	IN malop character)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    idGiaoVien_in INTEGER;
    idLop_in INTEGER;
BEGIN
    -- Check if iduser already exists in GiaoVien table
    SELECT "idGiaoVien" INTO idGiaoVien_in FROM public."GiaoVien" WHERE "idUser" = iduser LIMIT 1;

    -- If iduser does not exist, insert into GiaoVien table
    IF idGiaoVien_in IS NULL THEN
        INSERT INTO public."GiaoVien"("idUser") VALUES (iduser);
        SELECT "idGiaoVien" INTO idGiaoVien_in FROM public."GiaoVien" WHERE "idUser" = iduser LIMIT 1;
    END IF;

    -- SELECT idLophoc in LopHoc table and retrieve idLop
    SELECT "idLop" INTO idLop_in FROM public."LopHoc" WHERE "MaLop" = malop LIMIT 1;

    -- INSERT INTO GiaoVienLopHoc table
    INSERT INTO public."GiaoVienLopHoc"("idLop", "idGiaoVien") VALUES (idLop_in, idGiaoVien_in);

    COMMIT;
END; 
$BODY$;







-----------------------------------------------------------------------proc tạo lớp học


CREATE OR REPLACE PROCEDURE public.createclass(
	IN iduser integer,
	IN tenlop character,
	IN chude character,
	IN phong character,
	IN malop character)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    idGiaoVien_in INTEGER;
    idLop_in INTEGER;
BEGIN
    -- Check if iduser already exists in GiaoVien table
    SELECT "idGiaoVien" INTO idGiaoVien_in FROM public."GiaoVien" WHERE "idUser" = iduser LIMIT 1;

    -- If iduser does not exist, insert into GiaoVien table
    IF idGiaoVien_in IS NULL THEN
        INSERT INTO public."GiaoVien"("idUser") VALUES (iduser);
        SELECT "idGiaoVien" INTO idGiaoVien_in FROM public."GiaoVien" WHERE "idUser" = iduser LIMIT 1;
    END IF;

    -- INSERT INTO LopHoc table and retrieve idLop
    INSERT INTO public."LopHoc"("TenLop", "ChuDe", "Phong", "MaLop") VALUES (tenlop, chude, phong, malop);
    SELECT "idLop" INTO idLop_in FROM public."LopHoc" WHERE "MaLop" = malop LIMIT 1;

    -- INSERT INTO GiaoVienLopHoc table
    INSERT INTO public."GiaoVienLopHoc"("idLop", "idGiaoVien") VALUES (idLop_in, idGiaoVien_in);

    COMMIT;
END 
$BODY$; 