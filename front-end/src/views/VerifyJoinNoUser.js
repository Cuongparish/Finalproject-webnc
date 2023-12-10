import { React } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VerifyJoinNoUser = () => {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    // Lưu URL vào local storage
    sessionStorage.setItem("lastVisitedUrl", window.location.pathname);
    navigate("/login");
    window.location.reload();
  };

  const borderStyle = {
    border: '2px solid #000000',
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
      <p>Bạn chưa đăng nhập, vui lòng chuyển sang trang đăng nhập. Cảm ơn !!!!!!!</p>
      <Button variant="secondary" onClick={handleLoginPage} className="rounded-2">Chuyển sang trang login</Button>
    </Container>
  );
};

export default VerifyJoinNoUser;