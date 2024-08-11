import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker, InputNumber, AutoComplete, Dropdown, Button, Switch, Space } from 'antd';

import { useBookingParams } from '../../utils/hooks/useBookingParams';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const options = [
  { value: 'Минск' },
  { value: 'Казань' },
  { value: 'Сочи' },
  { value: 'Москва' },
  { value: 'Гомель' },
];

function SearchAdsBar() {
  const [bookingParams, updateBookingParams] = useBookingParams()

  const navigate = useNavigate()
  const [address, setAddress] = useState(bookingParams.address)
  const [leaseDateRange, setLeaseDateRange] = useState([
    bookingParams.begin_date, bookingParams.end_date
  ])
  const [countPeople, setCountPeople] = useState(bookingParams.count_people)
  const [petsCheck, setPetsCheck] = useState(bookingParams.pets_check)

  const [addressInvalid, setAddressInvalid] = useState(false)
  const [dateInvalid, setDateInvalid] = useState(false)

  const items = [
    {
      key: '1',
      icon: <InputNumber
        min={1}
        max={30}
        defaultValue={countPeople}
        className='search'
        size='large'
        style={{
          width: 120,
          'font-size': 18,
        }}
        onChange={(e) => { setCountPeople(e) }}
      />,
      disabled: true,
    },
    {
      key: '2',
      icon: <Switch
        checkedChildren="С питомцами"
        unCheckedChildren="Без питомцев"
        onChange={(e) => { setPetsCheck(!petsCheck) }}
      />,
      disabled: true,
    }
  ];

  const onClickSearchButton = () => {
    if (!address) {
      setAddressInvalid(!addressInvalid)
    } 
    if (!leaseDateRange) {
      setDateInvalid(!dateInvalid)
    } else {
      updateBookingParams({
        address: address,
        begin_date: leaseDateRange[0],
        end_date: leaseDateRange[1],
        count_people: countPeople,
        pets_check: petsCheck,
        days_lease: dayjs(leaseDateRange[1], 'YYYY/MM/DD').diff(dayjs(leaseDateRange[0], 'YYYY/MM/DD'), 'days')
      })
      navigate('/search/ads/', { replace: true });
    }
  }

  return (
    <>
      <div className='search_bar'>
        <AutoComplete
          className='search'
          size='large'
          defaultValue={address}
          status={addressInvalid?'error':''}
          style={{ width: 300, height: 44 }}
          options={options}
          onChange={(e) => { setAddress(e) }}
        />
        <RangePicker
          className='search'
          size='large'
          disabledDate={(current) => {
            return current && current < dayjs().subtract(1, 'day').endOf('day');
          }}
          defaultValue={[
            dayjs(leaseDateRange[0], 'YYYY/MM/DD'),
            dayjs(leaseDateRange[1], 'YYYY/MM/DD')
          ]}
          status={addressInvalid?'error':''}
          onChange={(e, es) => { if (e) setLeaseDateRange(es) }}
          style={{ width: 575, height: 44 }}
        />
        <Dropdown
          menu={{
            items,
            onClick: (e) => { console.log('click', e); },
          }} placement="bottomRight"
        >
          <Button
            className='search'
            size='large'
            style={{ width: 280, height: 44 }}
          >
            <Space>
              Гости: {countPeople} - {petsCheck ? 'с питомцами' : 'без питомцев'}
            </Space>
          </Button>
        </Dropdown>
        <Button
          size='large'
          style={{
            width: 50,
            height: 50,
            fontSize: 26,
            'margin-left': 0
          }}
          type="primary" shape="circle"
          onClick={onClickSearchButton}
        >
          <SearchOutlined />
        </Button>
      </div>
    </>
  );
}

export default SearchAdsBar;