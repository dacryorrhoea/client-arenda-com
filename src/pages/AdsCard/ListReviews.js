import { Tag, Avatar, Flex, Rate} from "antd";
import { StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


function ListReviews({ reviewsListData }) {
  return (
    <>
      {(() => {
        const elements = []

        reviewsListData.forEach(review => {
          if (review.category !== null) {
            elements.push(
              <div className='review_block'>
                <div style={{ 'display': 'flex'}}>
                  <Link>
                    <Avatar size={100} src={<img src={review.owner.profile.avatar} alt="avatar" />} />
                  </Link>
                  <div className='lessor_info_block'>
                    <h5 style={{ 'font-weight': '600' }}>
                      {review.owner.profile.first_name} {review.owner.profile.last_name}
                    </h5>
                    <Flex gap="4px 0" wrap>
                      {review.owner.owned_reservations.length > 23? 
                        <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                          Путешественик
                        </Tag>
                      : <></>}
                      <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                        Ревизор
                      </Tag>
                    </Flex>
                    <p style={{'margin-top':'15px', 'margin-bottom':'0px'}}>
                      <span>
                        <Rate
                          style={{'color':'#ed0e42'}}
                          disabled
                          defaultValue={review.rating}
                          tooltips={['ужасно', 'плохо', 'нормально', 'хорошо', 'прекрасно']}
                        />
                      </span>
                    </p>
                  </div>
                </div>
                <p>{review.text.slice(0, 400)}</p>
                <p>на {review.reservation.begin_lease} по {review.reservation.end_lease}</p>
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