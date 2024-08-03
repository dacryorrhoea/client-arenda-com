function LessorList({ adsListData }) {
  return (
    <>
      {(() => {
        console.log(adsListData)
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
                <p>Адрес: {ad.address}</p>
                <p>Цена: {ad.price}$</p>
                <p>Описание: {ad.description.slice(0, 50)}...</p>
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