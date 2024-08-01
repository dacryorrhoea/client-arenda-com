function ListReviews({ reviewsListData }) {
  return (
    <>
      <div className='review_block'>
                <img src='https://www.anilibria.tv/storage/releases/posters/9725/8RIUaBHZVcX6BgTF__744550fa135767afb7e429ccda3d904e.jpg' />
                <p>оценка 5 бобров из 5</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum mollitia eaque sint, iusto veniam dolorum eius temporibus, omnis praesentium aperiam minima rerum? Possimus consequatur accusantium debitis, quos aut illo nesciunt.</p>
              </div>
              <div className='review_block'>
                <img src='https://www.anilibria.tv/storage/releases/posters/9725/8RIUaBHZVcX6BgTF__744550fa135767afb7e429ccda3d904e.jpg' />
                <p>оценка 5 бобров из 5</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum mollitia eaque sint, iusto veniam dolorum eius temporibus, omnis praesentium aperiam minima rerum? Possimus consequatur accusantium debitis, quos aut illo nesciunt.</p>
              </div>
              <div className='review_block'>
                <img src='https://www.anilibria.tv/storage/releases/posters/9725/8RIUaBHZVcX6BgTF__744550fa135767afb7e429ccda3d904e.jpg' />
                <p>оценка 5 бобров из 5</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum mollitia eaque sint, iusto veniam dolorum eius temporibus, omnis praesentium aperiam minima rerum? Possimus consequatur accusantium debitis, quos aut illo nesciunt.</p>
              </div>
              <div className='review_block'>
                <img src='https://www.anilibria.tv/storage/releases/posters/9725/8RIUaBHZVcX6BgTF__744550fa135767afb7e429ccda3d904e.jpg' />
                <p>оценка 5 бобров из 5</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum mollitia eaque sint, iusto veniam dolorum eius temporibus, omnis praesentium aperiam minima rerum? Possimus consequatur accusantium debitis, quos aut illo nesciunt.</p>
              </div>
              <div className='review_block'>
                <img src='https://www.anilibria.tv/storage/releases/posters/9725/8RIUaBHZVcX6BgTF__744550fa135767afb7e429ccda3d904e.jpg' />
                <p>оценка 5 бобров из 5</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum mollitia eaque sint, iusto veniam dolorum eius temporibus, omnis praesentium aperiam minima rerum? Possimus consequatur accusantium debitis, quos aut illo nesciunt.</p>
              </div>
      {/* {(() => {
        console.log('vivoju spisok')
        const data = reviewsListData.map((result) => ({
          id: result.id,
          address: result.address,
          price: result.price,
          description: result.short_desc
        }));

        const elements = []

        data.forEach(ad => {
          if (ad.category !== null) {
            elements.push(
              <div className='review_block'>
                <img src='https://www.anilibria.tv/storage/releases/posters/9725/8RIUaBHZVcX6BgTF__744550fa135767afb7e429ccda3d904e.jpg' />
                <p>оценка 5 бобров из 5</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum mollitia eaque sint, iusto veniam dolorum eius temporibus, omnis praesentium aperiam minima rerum? Possimus consequatur accusantium debitis, quos aut illo nesciunt.</p>
              </div>
            );
          }
        });

        return elements;
      })()} */}
    </>
  )
}

export default ListReviews;