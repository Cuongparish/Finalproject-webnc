import { React, useState, useEffect } from "react";

import Review from "./Review";
import DetailReview from "./DetailReview";

import ReviewService from "../service/review.service";

import "../App.css";

const ListReview = (props) => {
    const user = props.user;
    const DetailClass = props.DetailClass;

    const [ListReviewData, setListReviewData] = useState([]);

    const [ReviewClicked, setReviewClicked] = useState();

    const [showDetail, setShowDetail] = useState(false);

    const handleShowDetail = (review) => {
        setShowDetail(true);
        setReviewClicked(review);
    };

    const handleHideDetail = () => {
        setShowDetail(false);
    };

    const GetDataReview = async () => {
        try {
            await ReviewService.GetReview(DetailClass.idLop, user.idUser).then(
                (res) => {
                    console.log(res);
                    if (res.data) {
                        setListReviewData(res.data);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        GetDataReview();
    }, [user]);

    useEffect(() => {
        if (sessionStorage.getItem("idPhucKhao")) {
            const idPhucKhao = sessionStorage.getItem("idPhucKhao");
            
            // Tìm review trong mảng ListReviewData với idPhucKhao tương ứng
            const foundReview = ListReviewData.find(review => String(review.idPhucKhao) === idPhucKhao);

            if(foundReview)
            {
                setReviewClicked(foundReview);
                setShowDetail(true);
            }
        }
    }, [ListReviewData])

    return (
        <>
            {showDetail ? (
                <DetailReview onClick={handleHideDetail} reviewClicked={ReviewClicked} user={user} />
            ) : (
                <>
                    {ListReviewData.map((review) => (
                        <Review
                            review={review}
                            onClick={() => handleShowDetail(review)}
                        />
                    ))}
                </>
            )}
        </>
    );
};

// const [showDetail, setShowDetail] = useState(false);
//     const [selectedReview, setSelectedReview] = useState(null);

//     const handleShowDetail = (review) => {
//         setSelectedReview(review);
//         setShowDetail(true);
//     };

//     const handleHideDetail = () => {
//         setSelectedReview(null);
//         setShowDetail(false);
//     };

//     // Assume ListReviewData is an array of review data
//     const ListReviewData = [
//         { id: 1, content: "Review 1 content", user: "User 1" },
//         { id: 2, content: "Review 2 content", user: "User 2" },
//         { id: 3, content: "Review 3 content", user: "User 3" },
//     ];

//     return (
//         <>
//             {showDetail ? (
//                 <DetailReview review={selectedReview} onHideDetail={handleHideDetail} />
//             ) : (
//                 <>
//                     {ListReviewData.map((review) => (
//                         <Review
//                             key={review.id}
//                             content={review.content}
//                             user={review.user}
//                             onClick={() => handleShowDetail(review)}
//                         />
//                     ))}
//                 </>
//             )}
//         </>
//     );

export default ListReview;
