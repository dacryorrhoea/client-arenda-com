function ListReviews({ reviewsListData }) {
  return (
    <>
      {(() => {
        const elements = []

        reviewsListData.forEach(review => {
          if (review.category !== null) {
            elements.push(
              <div className='review_block'>
                <p>
                <img src='https://i.pinimg.com/564x/14/88/ae/1488ae2bb4c75132b59da6b038e16f21.jpg' />
                {`   ${review.owner.first_name} ${review.owner.last_name}`}
                </p>
                <p>оценка {review.rating} бобров из 10</p>
                <p>{review.text}</p>
              </div>
            );
          }
        });

        return elements.slice(0, 10);
      })()}
    </>
  )
}

export default ListReviews;