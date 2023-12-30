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


-----------------------------------------------------------proc thêm 1 thành phần điểm cho học sinh
CREATE OR REPLACE PROCEDURE addScoreforaStudent(
    IN p_idLop INTEGER,
    IN p_TenCotDiem CHARACTER VARYING,
    IN p_Diem NUMERIC,
    IN p_StudentId CHARACTER VARYING,
    OUT p_Result TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Kiểm tra xem StudentId có tồn tại trong lớp không
    IF EXISTS (
        SELECT 1
        FROM public."HocSinhLopHoc" hslh
        JOIN public."HocSinh" hs ON hslh."idHocSinh" = hs."idHocSinh"
        WHERE hslh."idLop" = p_idLop AND hs."StudentId" = p_StudentId
    ) THEN
        -- Tìm idCotDiem cho cột điểm cụ thể trong lớp
        WITH CotDiemInfo AS (
            SELECT
                cd."idCotDiem",
                cd."idLop"
            FROM
                public."CotDiem" cd
                JOIN public."LopHoc" lh ON cd."idLop" = lh."idLop"
            WHERE
                lh."idLop" = p_idLop
                AND cd."TenCotDiem" = p_TenCotDiem
        )

        -- Chèn hoặc cập nhật điểm cho tất cả học sinh trong lớp và cột điểm cụ thể
        INSERT INTO public."BangDiemThanhPhan" ("idHocSinh", "idCotDiem", "idLop", "Diem")
        VALUES (
            (SELECT hs."idHocSinh" FROM public."HocSinh" hs WHERE hs."StudentId" = p_StudentId),
            (SELECT ci."idCotDiem" FROM CotDiemInfo ci),
            p_idLop,
            p_Diem
        )
        ON CONFLICT ("idHocSinh", "idCotDiem", "idLop") DO UPDATE
        SET "Diem" = p_Diem;

        -- Trả về thông báo thành công
        p_Result := 'Success';
    ELSE
        -- Trả về thông báo lỗi
        p_Result := 'StudentId không tồn tại trong lớp';
    END IF;
END;
$$;