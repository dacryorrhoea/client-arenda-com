function LessorList({ adsListData }) {
  return (
    <>
      {(() => {
        const data = adsListData.map((result) => ({
          id: result.id,
          address: result.address,
          price: result.price,
          description: result.description
        }));

        const elements = []

        data.forEach(ad => {
          if (ad.category !== null) {
            elements.push(
              <div key={ad.id} className='ads_block'>
                <img src='https://www.anilibria.tv/storage/releases/posters/9725/8RIUaBHZVcX6BgTF__744550fa135767afb7e429ccda3d904e.jpg' />
                <p>{ad.address}</p>
                <p>{ad.price}$</p>
                <p>{ad.description}</p>
              </div>
            );
          }
        });

        return elements;
      })()}
    </>
  );
}

export default LessorList;