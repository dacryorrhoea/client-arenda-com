import { Link } from "react-router-dom";

function RentorList({ reservationsListData }) {
  return (
    <>
      {(() => {
        const data = reservationsListData.map((result) => ({
          id: result.id,
          begin_lease: result.begin_lease,
          end_lease: result.end_lease,
          status: result.lease_end_status,
          ad_id: result.ad.id
        }));

        const elements = []

        data.forEach(reservation => {
          if (reservation.category !== null) {
            elements.push(
              <div key={reservation.id} className='ads_block'>
                <p>Бронь на: {reservation.begin_lease} - {reservation.end_lease}</p>
                <p>Статус: {reservation.status? 'Завершено': 'Не завершено'}</p>
                <p>Объявление: 
                  <Link to={`/search/ads/${reservation.ad_id}`} replace='true'> {reservation.ad_id}</Link>
                </p>
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