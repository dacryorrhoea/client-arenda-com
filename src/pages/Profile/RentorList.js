function RentorList({ reservationsListData }) {
  return (
    <>
      {(() => {
        const data = reservationsListData.map((result) => ({
          id: result.id,
          begin_lease: result.range_lease.upper,
          end_lease: result.range_lease.lower,
          ad_id: result.ad.id
        }));

        const elements = []

        data.forEach(reservation => {
          if (reservation.category !== null) {
            elements.push(
              <div key={reservation.id} className='ads_block'>
                <p>{reservation.begin_lease}</p>
                <p>{reservation.end_lease}</p>
                <p>бронь {reservation.id}</p>
                <p>объявление {reservation.ad_id}</p>
              </div>
            );
          }
        });

        return elements;
      })()}
    </>
  );
}

export default RentorList;