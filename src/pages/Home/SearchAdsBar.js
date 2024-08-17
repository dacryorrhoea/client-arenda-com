import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker, InputNumber, AutoComplete, Flex, Dropdown, Input, Button, Switch, Space } from 'antd';

import { useBookingParams } from '../../utils/hooks/useBookingParams';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAddresses } from '../../utils/hooks/useAddresses';

const { RangePicker } = DatePicker;

function SearchAdsBar() {
  const [bookingParams, updateBookingParams] = useBookingParams()

  const {data, isLoading} = useAddresses()
  const [listAddresses, setListAddresses] = useState([])

  const [options, setOptions] = useState([{
    value: 'Санкт-Петербург',
  },{
    value: 'Москва',
  },{
    value: 'Казань',
  },{
    value: 'Минск',
  },{
    value: 'Краснодар',
  },{
    value: 'Гродно',
  },])

  const navigate = useNavigate()
  const [address, setAddress] = useState(bookingParams.address)
  const [leaseDateRange, setLeaseDateRange] = useState([bookingParams.begin_date, bookingParams.end_date])
  const [countPeople, setCountPeople] = useState(bookingParams.count_people)
  const [petsCheck, setPetsCheck] = useState(bookingParams.pets_check)
  const [kidsCheck, setKidsCheck] = useState(bookingParams.kids_check)

  const [addressInvalid, setAddressInvalid] = useState(false)
  const [dateInvalid, setDateInvalid] = useState(false)

  useEffect(() => {
    if (data) {
      const elements = []
      data.forEach(element => {
        elements.push({
          address: element.address,
          address_split: element.address.split(',')
        })
      });
      // console.log(elements)
      setListAddresses(elements)
    }
  }, [data])

  const getPanelValue = (text) => {
    setAddress(text)
    const cities = []
    const addresses = []
    const split_text = text.split(',')

    if (split_text[0] !== '') {
      listAddresses.forEach(address => {
        if (address.address_split[0].toLowerCase().includes(split_text[0].toLowerCase())) {
          console.log(address.address_split[0] + '|' + split_text[0])
          addresses.push({key: address.address_split[2],
            value: address.address,})
        }
      })
    }
    // console.log(addresses)
    
    setOptions(addresses)
  } 

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
        value={petsCheck}
        checkedChildren="С питомцами"
        unCheckedChildren="Без питомцев"
        onChange={(e) => { setPetsCheck(!petsCheck) }}
      />,
      disabled: true,
    },
    {
      key: '3',
      icon: <Switch
        value={kidsCheck}
        checkedChildren="С детьми"
        unCheckedChildren="Без детей"
        onChange={(e) => { setKidsCheck(!kidsCheck) }}
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
        kids_check: kidsCheck,
        pets_check: petsCheck,
        days_lease: dayjs(leaseDateRange[1], 'YYYY/MM/DD').diff(dayjs(leaseDateRange[0], 'YYYY/MM/DD'), 'days')
      })
      navigate('/search/ads/', { replace: true });
    }
  }

  return (
    <>
      <div className='search_bar'>
        {/* <Input
          className='search'
          size='large'
          options={options}
          value={address}
          // defaultValue={address}
          status={addressInvalid?'error':''}
          style={{ width: 300, height: 44 }}
          onChange={(e) => getPanelValue(e.target.value)}
        /> */}
        {/* <div style={{'position':'absolute','top':'100px','left':'20px','height':'200px','width':'400px','overflow':'scroll','overflow-x':'hidden'}}>
          {(() => {
            const elems = []
            options.forEach(elem => {
              elems.push(<Button onClick={() => setAddress(elem.value)}>{elem.value}</Button>)
            })
            return elems
          })()}
        </div> */}
        <AutoComplete
          className='search'
          size='large'
          options={options}
          value={address}
          defaultValue={address}
          status={addressInvalid?'error':''}
          style={{ width: 300, height: 44 }}
          onChange={(e) => setAddress(e)}
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
      <div style={{'position':'absolute','top':'70px','left':'30px'}}>
          <Flex>
            <div style={{'font-size':'15px'}}>Например: </div>
            <Button size='small' type='text' style={{'font-size':'15px'}} onClick={() => setAddress('Москва')}>Москва</Button>
            <Button size='small' type='text' style={{'font-size':'15px'}} onClick={() => setAddress('Питер')}>Питер</Button>
            <Button size='small' type='text' style={{'font-size':'15px'}} onClick={() => setAddress('Казань')}>Казань</Button>
            <Button size='small' type='text' style={{'font-size':'15px'}} onClick={() => setAddress('Минск')}>Минск</Button>
            <Button size='small' type='text' style={{'font-size':'15px'}} onClick={() => setAddress('Гродно')}>Гродно</Button>
            <Button size='small' type='text' style={{'font-size':'15px'}} onClick={() => setAddress('Краснодар')}>Краснодар</Button>
            <Button size='small' type='text' style={{'font-size':'15px'}} onClick={() => setAddress('Санкт-Петербург')}>Санкт-Петербург</Button>
          </Flex>
      </div>
      </div>
    </>
  );
}

export default SearchAdsBar;