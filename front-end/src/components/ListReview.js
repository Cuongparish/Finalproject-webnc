import { React, useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";

import Review from "./Review";
import DetailReview from "./DetailReview";

import "../App.css";

const ListReview = (props) => {
    // const user = props.user;
    // const DetailClass = props.DetailClass;

    const [showDetail, setShowDetail] = useState(false);

    const handleShowDetail = () => {
        setShowDetail(true);
    };

    const handleHideDetail = () => {
        setShowDetail(false);
    };

    return (
        <>
            {showDetail ? (
                <DetailReview onClick={handleHideDetail}/>
            ) : (
                <>
                    <Review onClick={handleShowDetail} />
                    <Review onClick={handleShowDetail} />
                    <Review onClick={handleShowDetail} />
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
