import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import { useState } from "react";
import { CloseCircleFilled, ClockCircleFilled, CheckCircleFilled, SearchOutlined, EditFilled } from "@ant-design/icons";

function ReviewsList({reviewsListData}) {
  return (
    <>
      {(() => {
        const data = reviewsListData.map((result) => ({
          id: result.id,
          text: result.text,
          rating: result.rating,
          ad_id: result.ad
        }));

        const elements = []

        data.forEach(review => {
          if (review.category !== null) {
            elements.push(
              <div key={review.id} className='ads_block'>
                <h5>Для объявления - 
                <Link to={`/search/ads/${review.ad_id}`} replace='true'> {review.ad_id}</Link>
                </h5>
                <p>Оценка: {review.rating}</p>
                <p>Отзыв: {review.text.slice(0, 30)}...</p>
              </div>
            );
          }
        });

        return elements;
      })()}
    </>
  );
}

export default ReviewsList;