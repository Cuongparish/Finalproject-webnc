/* eslint-disable jsx-a11y/img-redundant-alt */
import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel, Row, Image } from 'react-bootstrap';
//import { Link } from 'react-router-dom'; 
import styles from "./styles.module.css";
import AuthService from "../service/auth.service";



const Home = (userDetails) => {
    const user = userDetails.user;

    return (
        <Row className='pt-5'>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <Image
                        className="d-block w-100"
                        src={process.env.PUBLIC_URL + '/images/slide_1.jpg'}
                        height={670}
                        alt=""
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <Image
                        className="d-block w-100"
                        src={process.env.PUBLIC_URL + '/images/slide_1.jpg'}
                        height={670}
                        alt=""
                    />
                </Carousel.Item>
            </Carousel>
        </Row>
    //     <div className={styles.container}>
    //     <h1 className={styles.heading}>Home</h1>
    //     <div className={styles.form_container}>
    //         <div className={styles.left}>
    //             <img className={styles.img} src="./images/profile.jpg" alt="login" />
    //         </div>
    //         <div className={styles.right}>
    //             <h2 className={styles.from_heading}>Profile</h2>
    //             <img
    //                 src={user.picture}
    //                 alt="profile"
    //                 className={styles.profile_img}
    //             />
    //             <input
    //                 type="text"
    //                 defaultValue={user.name}
    //                 className={styles.input}
    //                 placeholder="UserName"
    //             />
    //             <input
    //                 type="text"
    //                 defaultValue={user.email}
    //                 className={styles.input}
    //                 placeholder="Email"
    //             />
    //             <button className={styles.btn} onClick={AuthService.logout}>
    //                 Log Out
    //             </button>
    //         </div>
    //     </div>
    // </div>
    );
}

export default Home;
