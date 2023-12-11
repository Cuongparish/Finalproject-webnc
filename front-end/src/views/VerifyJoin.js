import { React } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ClassService from "../service/class.service";

const VerifyJoin = (props) => {
  const user = props.user;
  const { malop, role } = useParams();
  console.log(user);
  console.log(malop);
  console.log(role);

  let Role = role;
  if(role === "gv")
  {
    Role = "giáo viên";
  }
  if(Role === "hs")
  {
    Role = "học sinh";
  }

  const navigate = useNavigate();

  const handleCancel = async () => {
    navigate(`/home`);
    window.location.reload();
  }

  const handleConfirm = async () => {
    try {
      await ClassService.JoinClassByLink(user.idUser, malop, role).then(
        (res) => {
          navigate(`/detail-class/${malop}`);
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const borderStyle = {
    border: '2px solid #007bff',
    padding: '10px',
    borderRadius: '5px',
    width: 'fit-content',
    height: 'fit-content',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  
  return (
    <Container style={borderStyle} className="d-flex flex-column align-items-center justify-content-center">
      <p>Bạn sẽ tham gia lớp học với vai trò là {Role}?</p>
      <Button variant="danger" onClick={handleCancel} className="rounded-2">Hủy</Button>
      <br></br>
      <Button variant="success" onClick={handleConfirm} className="rounded-2">Xác nhận</Button>
    </Container>
  );
}

export default VerifyJoin;