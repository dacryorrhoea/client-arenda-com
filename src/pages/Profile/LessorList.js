import { Link } from "react-router-dom";
import { Segmented, Avatar, Card, Flex, Tooltip, List, Tag, TimePicker, InputNumber, DatePicker, Button, Rate, Select, Modal, Popconfirm, Form, Input, Checkbox, AutoComplete, Slider, Switch } from "antd";
import { useState } from "react";
import { deleteAd } from "../../utils/requests/client.ads";
import { EditOutlined, DeleteOutlined, StarOutlined, CloseCircleFilled, ClockCircleFilled, CheckCircleFilled, SearchOutlined, EditFilled } from "@ant-design/icons";
import { updateAd } from "../../utils/requests/client.ads";
import dayjs from 'dayjs';

function ReservationsList({reservations}) {
  return (
    <div style={{'overflow': 'scroll', 'overflow-x': 'hidden', 'flex': '1 0','height':'100%'}}> {(() => {
        const elements = []

        reservations.forEach(reservation => {
          if (reservation.category !== null) {
            elements.push(
              <div key={reservation.id}
                style={reservation.lease_end_status?{'background-color':'green','margin':'10px'}:{'background-color':'red','margin':'10px'}}
              >
                <p>{reservation.begin_lease}</p>
                <p>{reservation.end_lease}</p>
              </div>
            );
          }
        });

        return elements;
      })()}
    </div>
  );
}

function ReviewsList({reviews}) {
  return (
    <div style={{'overflow': 'scroll', 'overflow-x': 'hidden', 'flex': '1 0','height':'100%'}}> {(() => {
        const elements = []

        reviews.forEach(review => {
          if (review.category !== null) {
            elements.push(
              <div className='review_block'>
                <div style={{ 'display': 'flex'}}>
                  <Link>
                    <Avatar size={100} src={<img src='https://i.pinimg.com/564x/14/88/ae/1488ae2bb4c75132b59da6b038e16f21.jpg' alt="avatar" />} />
                  </Link>
                  <div className='lessor_info_block'>
                    <h5 style={{ 'font-weight': '600' }}>
                      {review.owner.first_name} {review.owner.last_name}
                    </h5>
                    <Flex gap="4px 0" wrap>
                      <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                        Путешественик
                      </Tag>
                      <Tag icon={<StarOutlined />} color="#efdc09" style={{ 'color': 'black', 'font-size': '11px', 'font-weight': '700', 'height': '22px' }}>
                        Ревизор
                      </Tag>
                    </Flex>
                    <p style={{'margin-top':'15px', 'margin-bottom':'0px'}}>
                      <span>
                        <Rate
                          style={{'color':'#ed0e42'}}
                          disabled
                          defaultValue={~~(review.rating / 2)}
                          tooltips={['ужасно', 'плохо', 'нормально', 'хорошо', 'прекрасно']}
                        />
                      </span>
                    </p>
                  </div>
                </div>
                <p>{review.text.slice(0, 400)}</p>
                <p>На дату такую то, тогда то</p>
              </div>
            );
          }
        });

        return elements;
      })()}
    </div>
  );
}

const { TextArea } = Input;

function UpdateAds({ isOpenUpdateAds, setIsOpenUpdateAds, ad }) {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    updateAd(ad.id, {
      description: values.description,
      img_src: values.img_src,
      clock_entry: `Заезд после ${values.clock_entry.format('HH:mm')}`,
      clock_leave: `Отъезд до ${values.clock_leave.format('HH:mm')}`,
      min_length_of_stay: values.min_length_of_stay,
      max_length_of_stay: values.max_length_of_stay,
      animal_check: values.rules.includes('animal_check') ? true : false,
      smoking_check: values.rules.includes('smoking_check') ? true : false,
      party_check: values.rules.includes('party_check') ? true : false,
      docs_check: values.docs_check,
      kids_check: values.rules.includes('kids_check') ? true : false,
      wifi: values.comfort.includes('wifi') ? true : false,
      drier: values.comfort.includes('drier') ? true : false,
      towel: values.comfort.includes('towel') ? true : false,
      bed_linen: values.comfort.includes('bed_linen') ? true : false,
      tv: values.comfort.includes('tv') ? true : false,
      microwave: values.comfort.includes('microwave') ? true : false,
      electric_kettle: values.comfort.includes('electric_kettle') ? true : false,
      balcony: values.comfort.includes('balcony') ? true : false,
      params: '14 гостей, 9 кроватей, 4 спальни, всего этажей 2',
      count_beds: values.count_beds,
      square: values.square,
      count_people: values.count_people,
      sleeping_places: values.sleeping_places,
      beds_info: '4 односпальных кровати, 4 двуспальных кровати',
      type_flats: 'Вилла',
      short_desc: values.short_desc,
      address: values.address,
      price: values.price,
    })
  };

  return (
    <Modal
      title='Описание объявления'
      width={700}
      open={isOpenUpdateAds}
      onCancel={() => setIsOpenUpdateAds(false)}
      footer={[<Button type="primary" onClick={() => { form.submit() }}>Обновить объявление</Button>,]}
    >
      <Flex justify='center'
        style={{
          'overflow': 'scroll',
          'overflow-x': 'hidden',
          'flex': '1 0',
          'height': '70vh',
          'scrollbar-width': 'none'
        }}>
        <Form
          form={form}
          layout='vertical'
          style={{ 'width': '100%', 'padding': '1%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item initialValue={ad.address} label='Адрес' name="address" rules={[{ required: true, message: 'Укажите адрес!' }]}>
            <AutoComplete></AutoComplete>
          </Form.Item>

          <Form.Item initialValue={ad.img_src} label='Изображение' name="img_src" rules={[{ required: true, message: 'Изображение!' }]}>
            <Input/>
          </Form.Item>

          <Form.Item initialValue={ad.description} label='Полное описание' name="description" rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <TextArea/>
          </Form.Item>

          <Form.Item initialValue={ad.short_desc} label='Краткое описание' name="short_desc" rules={[{ required: true, message: 'Укажите краткое описание объекта!' }]}>
            <TextArea/>
          </Form.Item>

          <Form.Item label='Заезд после' name="clock_entry" initialValue={dayjs(ad.clock_entry.slice(-5), 'HH:mm')} rules={[{ required: true, message: 'Изображение!' }]}>
            <TimePicker format={'HH:mm'} />
          </Form.Item>

          <Form.Item label='Отъезд до' name="clock_leave" initialValue={dayjs(ad.clock_entry.slice(-5), 'HH:mm')} rules={[{ required: true, message: 'Изображение!' }]}>
          <TimePicker format={'HH:mm'} />
          </Form.Item>

          <Form.Item name="rules" initialValue={[
                ad.animal_check? 'animal_check' : '',
                ad.smoking_check? 'smoking_check' : '',
                ad.party_check? 'party_check' : '',
                ad.kids_check? 'kids_check' : ''
              ]}>
            <Select
              mode="multiple"
              placeholder="Выберите что разрешеные действия на объекте"
              style={{ width: '100%' }}
              options={[
                { value: 'animal_check', label: 'Можно с питомцами' },
                { value: 'smoking_check', label: 'Можно курить' },
                { value: 'party_check', label: 'Можно вечеринки' },
                { value: 'kids_check', label: 'Можно с детьми' },
              ]}
            />
          </Form.Item>

          <Form.Item name="comfort" initialValue={[
                ad.wifi? 'wifi': '',
                ad.drier? 'drier': '',
                ad.towel? 'towel': '',
                ad.bed_linen? 'bed_linen': '',
                ad.tv? 'tv': '',
                ad.microwave? 'microwave': '',
                ad.electric_kettle? 'electric_kettle': '',
                ad.balcony? 'balcony': ''
              ]}>
            <Select
              mode="tags"
              placeholder="Выберите удобства объекта"
              style={{ width: '100%' }}
              options={[
                { value: 'wifi', label: 'Вай-фай' },
                { value: 'drier', label: 'Фен' },
                { value: 'towel', label: 'Полотенце' },
                { value: 'bed_linen', label: 'Постельное бельё' },
                { value: 'tv', label: 'Телевизор' },
                { value: 'microwave', label: 'Микроволновка' },
                { value: 'electric_kettle', label: 'Электрический чайник' },
                { value: 'balcony', label: 'Балкон/лоджия' },
              ]}
            />
          </Form.Item>

          <Form.Item name='docs_check' initialValue={ad.docs_check}>
            <Checkbox defaultChecked>Предоставляются документы о проживании</Checkbox>
          </Form.Item>

          <Form.Item initialValue={ad.price} label='Цена за сутки' name='price' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>

          <Form.Item initialValue={ad.square} label='Площадь' name='square' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber/>
          </Form.Item>

          <Form.Item initialValue={ad.count_people} label='Максимальное число людей' name='count_people' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>
          
          <Form.Item initialValue={ad.sleeping_places} label='Число спальных мест' name='sleeping_places' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>
          
          <Form.Item initialValue={ad.count_beds} label='Число кроватей' name='count_beds' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>
          
          <Form.Item initialValue={ad.min_length_of_stay} label='Минимальное число дней пребывания' name='min_length_of_stay' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>
          
          <Form.Item initialValue={ad.max_length_of_stay} label='Максимальное число дней пребывания' name='max_length_of_stay' rules={[{ required: true, message: 'Укажите описание объекта!' }]}>
            <InputNumber></InputNumber>
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  )
}

const tabList = [ {
  key: '1',
  tab: 'Отзывы',
},{
  key: '2',
  tab: 'Бронирования',
},
];

function LessorCard({ ad }) {
  const [currentTab, setcurrentTab] = useState('1')
  const [isOpenUpdateAds, setIsOpenUpdateAds] = useState(false)

  return (
    <>
      <Card
        style={{ width: '95%', 'margin-bottom': '20px' }}
        title={`Объект по адресу: ${ad.address}`}
        extra={
          <>
            <Tooltip placement="top" title='Просмотреть объявление'>
              <Button type="primary">
                <Link to={`/search/ads/${ad.id}`}>
                  <SearchOutlined style={{ 'font-size': '22px', 'color': 'white' }} />
                </Link>
              </Button>
            </Tooltip>
            <Tooltip placement="top" onClick={() => setIsOpenUpdateAds(true)} title='Редактировать объявление'>
              <Button type="primary" style={{ 'margin-left': '10px' }}>
                <Link>
                  <EditOutlined style={{ 'font-size': '22px', 'color': 'white' }} />
                </Link>
              </Button>
            </Tooltip>

            <Tooltip placement="top" title='Удалить объявление'>
              <Popconfirm
                placement="top"
                title='Удалить объявление'
                description="Уверены что хотите удалить объявление?"
                onConfirm={() => deleteAd(ad)}
                okText="Да"
                cancelText="Нет"
              >
                <Button type="primary" style={{ 'margin-left': '10px' }}>
                  <Link>
                    <DeleteOutlined style={{ 'font-size': '22px', 'color': 'white' }} />
                  </Link>
                </Button>
              </Popconfirm>
            </Tooltip>
          </>
        }
        tabList={tabList}
        activeTabKey={currentTab}
        onTabChange={(key) => setcurrentTab(key)}
      >
        <div style={{ 'height': '300px' }}>
          {currentTab == 1 ?
            <ReviewsList reviews={ad.reviews}/>
            :
            <></>
          }
          {currentTab == 2 ?
            <ReservationsList reservations={ad.reservations}/>
            :
            <></>
          }
        </div>
      </Card>
      <UpdateAds isOpenUpdateAds={isOpenUpdateAds} setIsOpenUpdateAds={setIsOpenUpdateAds} ad={ad}/>
    </>
  )
}

function LessorList({ adsListData }) {
  return (
    <>
      {(() => {
        const data = adsListData.map((result) => ({
          id: result.id,
          description: result.description,
          img_src: result.img_src,
          clock_entry: result.clock_entry,
          clock_leave: result.clock_leave,
          min_length_of_stay: result.min_length_of_stay,
          max_length_of_stay: result.max_length_of_stay,
          animal_check: result.animal_check,
          smoking_check: result.smoking_check,
          party_check: result.party_check,
          docs_check: result.docs_check,
          kids_check: result.kids_check,
          wifi: result.wifi,
          drier: result.drier,
          towel: result.towel,
          bed_linen: result.bed_linen,
          tv: result.tv,
          microwave: result.microwave,
          electric_kettle: result.electric_kettle,
          balcony: result.balcony,
          params: result.params,
          count_beds: result.count_beds,
          square: result.square,
          count_people: result.count_people,
          sleeping_places: result.sleeping_places,
          beds_info: result.beds_info,
          type_flats: result.type_flats,
          short_desc: result.short_desc,
          address: result.address,
          price: result.price,
          reservations: result.reservations,
          reviews: result.reviews
        }));

        const elements = []

        data.forEach(ad => { if (ad.category !== null) elements.push(<LessorCard ad={ad} />) });

        return elements;
      })()}
    </>
  );
}

export default LessorList;