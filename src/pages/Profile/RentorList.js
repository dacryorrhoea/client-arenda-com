import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import { useState } from "react";
import { CloseCircleFilled, ClockCircleFilled, CheckCircleFilled, SearchOutlined, EditFilled } from "@ant-design/icons";

const tabList = [{
    key: '1',
    tab: 'Статус',
  },{
    key: '2',
    tab: 'Отзыв',
  },{
    key: '3',
    tab: 'Чек',
  },
];

function RentorCard ({reservation}) {
  const [currentTab, setcurrentTab] = useState('1')

  return (
    <Card
      style={{ width: '95%', 'margin-bottom': '20px' }}
      title={`Бронь на ${reservation.begin_lease} - ${reservation.end_lease}`}
      extra={<Button type="primary" style={{'border-radius':'30px'}}>
        <Link to={`/search/ads/${reservation.ad_id}`}>
          <SearchOutlined style={{'font-size':'22px', 'color': 'white'}}/>
        </Link>
      </Button>}
      tabList={tabList}
      activeTabKey={currentTab}
      onTabChange={(key) => setcurrentTab(key)}
    >
      <div style={{'height':'150px'}}>
      {currentTab == 1 ?
        <>
          {reservation.status?
            <p><CheckCircleFilled style={{ 'font-size': '25px', 'color': '#417505' }} /> <span> </span> Завершено</p>
          :
            <p><CloseCircleFilled style={{ 'font-size': '25px', 'color': '#ed0e42' }} /> <span> </span> Не завершено</p>
          }
          {/* <p><ClockCircleFilled style={{ 'font-size': '25px', 'color': '#ffb300' }} /> <span> </span> Ожидает подтверждения арендодателем</p> */}
        </>
        :
        <></>
      }
      {currentTab == 2 ?
        <>
          {reservation.review?
            <>
              <p>оценка: {reservation.review.rating}</p>
              <p>Текст: {reservation.review.text}</p>
            </>
          :
            <p>Оставить отзыв можно только после окончания Бронирования</p>
          }
        </>
        :
        <></>
      }
      {currentTab == 3 ?
        <>
          {reservation.payment_receipt?
            <p>Вышло на сумму: {reservation.payment_receipt.sum}</p>
          :
            <p>тогда чеки ещё не придумали</p>
          }
        </>
        :
        <></>
      }
      </div>
    </Card>
  )
}

function RentorList({ reservationsListData }) {
  return (
    <>
      {(() => {
        const data = reservationsListData.map((result) => ({
          id: result.id,
          begin_lease: result.begin_lease,
          end_lease: result.end_lease,
          status: result.lease_end_status,
          ad_id: result.ad.id,
          review: result.review,
          payment_receipt: result.paymentreceipt
        }));

        const elements = []

        data.forEach(reservation => {
          if (reservation.category !== null) {
            elements.push(<RentorCard reservation={reservation}/>);
          }
        });

        return elements;
      })()}
    </>
  );
}

export default RentorList;