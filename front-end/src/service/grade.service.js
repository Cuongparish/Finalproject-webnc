import axios from "axios";

const API_URL = "https://finalproject-webnc.vercel.app";
//const API_URL = "http://localhost:5000";

const GetGradeStructure = (idLop) => {
    return axios
        .get(`${API_URL}/api/v1/user/grade/listPercentScore/${idLop}`)
        .then((res) => {
            //console.log("res: ", res);
            return res.data;
        });
}

const CreateGradeStructure = (idLop, Data) => {
    return axios
        .post(`${API_URL}/api/v1/user/grade/addPercentScore/${idLop}`, { Data })
        .then((res) => {
            //console.log("res: ", res);
            return res.data;
        });
};

const DelGradeStructure = (idLop, TenCotDiem) => {
    return axios
        .delete(`${API_URL}/api/v1/user/grade/delPercentScore/${idLop}`, {
            TenCotDiem
        })
        .then((res) => {
            //console.log("res: ", res);
            return res.data;
        });
};

const UpdateGradeStructure = (idLop, TenCotDiem, PhanTramDiem, idCotDiem) => {
    return axios
        .put(`${API_URL}/api/v1/user/grade/updatePercentScore/${idLop}`, {
            TenCotDiem,
            PhanTramDiem,
            idCotDiem
        })
        .then((res) => {
            //console.log("res: ", res);
            return res.data;
        });
};

const ExportToExcel_StudentList = async (idLop, type) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/user/grade/exporttoExcel_StudentList/${idLop}/type?format=${type}`, {
            responseType: 'blob', // Sử dụng 'blob' để nhận dữ liệu dưới dạng file
        });
        //console.log(response);
        return response.data; // Trả về dữ liệu blob từ response
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        //throw error; // Re-throw lỗi để xử lý ở phía gọi hàm nếu cần
    }
};

const ImportToExcel_StudentList = async (idLop, formData) => {
    console.log(formData);

    try {
        const response = await axios.post(`${API_URL}/api/v1/user/grade/importtoExcel_StudentList/${idLop}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // Xử lý phản hồi từ server nếu cần
        console.log('Server response:', response.data);
        return response.data;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error uploading file:', error);
    }
};

const GradeService = {
    CreateGradeStructure,
    GetGradeStructure,
    DelGradeStructure,
    UpdateGradeStructure,
    ExportToExcel_StudentList,
    ImportToExcel_StudentList,
};

export default GradeService;