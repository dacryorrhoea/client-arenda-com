import { Link } from "react-router-dom";
function FavouritesList({favoritesListData}) {
  return (
    <>
      {(() => {
        const data = favoritesListData.map((result) => ({
          id: result.id,
          ad_id: result.ad
        }));

        const elements = []

        data.forEach(favorite => {
          if (favorite.category !== null) {
            elements.push(
              <div key={favorite.id} className='ads_block'>
                <p>Избранное №{favorite.id} - 
                <Link to={`/search/ads/${favorite.ad_id}`} replace='true'> {favorite.ad_id}</Link>
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

export default FavouritesList;