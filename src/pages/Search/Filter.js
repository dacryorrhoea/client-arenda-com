import { useEffect, useState } from "react";
import { Button, Switch, ConfigProvider, Segmented, Slider, InputNumber,
        Checkbox, Row, Col, Radio} from "antd";
import { useBookingParams } from "../../utils/hooks/useBookingParams";


function Filter({ filterAds, updateFilterAds, setFormatCalculatingPrice}) {
  const [bookingParams] = useBookingParams()
  const [address, setAddress] = useState(filterAds.address)
  const [minPrice, setMinPrice] = useState(filterAds.price_min);
  const [maxPrice, setMaxPrice] = useState(filterAds.price_max);
  const [comfort, setComfort] = useState([])
  const [typeFlats, setTypeFlats] = useState('')

  useEffect(() => {
    updateFilterAds({
      address: address,
      price_min: minPrice,
      price_max: maxPrice,
      type_flats: typeFlats,
      wifi: comfort.includes('wifi')? true: '',
      towel: comfort.includes('towel')? true: '',
      bed_linen: comfort.includes('bed_linen')? true: '',
      tv: comfort.includes('tv')? true: '',
      drier: comfort.includes('drier')? true: '',
      microwave: comfort.includes('microwave')? true: '',
      electric_kettle: comfort.includes('electric_kettle')? true: '',
      balcony: comfort.includes('balcony')? true: '',
    })
  }, [minPrice, maxPrice, comfort, typeFlats])

  return (
    <>
      <ConfigProvider 
        theme={{
          token: {
            colorPrimary: 'red',
            fontSize: 17,
          },
          components: { Switch: { fontSize: 16 } } 
        }}>
        {/* показать избранное */}
        <div className="filter_item_wrapper_line">
          <p className="left_label">Вывести избранное</p>
          <Switch
            className="custom_input"
            style={{
              // fontSize: 10
            }}
          // onChange={(e) => { setPetsCheck(!petsCheck) }}
          />
        </div>

        {/* Показать историю */}
        <div className="filter_item_wrapper_line">
          <p className="left_label">Показать историю</p>
          <Switch
            className="custom_input"
            style={{
              'font-size': 50
            }}
          // onChange={(e) => { setPetsCheck(!petsCheck) }}
          />
        </div>
        
        {/* Цена */}
        <div className="filter_item_wrapper_row">
          <p>Цена</p> 
          <Segmented
            className=""
            size="middle"
            options={bookingParams.days_lease > 1?
              ['за 1 сутки', `за ${bookingParams.days_lease} суток`]:
              ['за 1 сутки']
            }
            onChange={(value) => {if (value === 'за 1 сутки') {setFormatCalculatingPrice(true)} else {setFormatCalculatingPrice(false)}}}
            style={{
              height: 32,
              'margin-bottom': '20px'
            }}
          />
          <p>от - до</p>
          <div style={{'display':'flex'}}>
            <InputNumber
              min={500}
              max={100000}
              size="large"
              value={minPrice}
              onChange={(e) => {setMinPrice(e)}}
              style={{
                width: 100,
                'margin-left': '5px'
              }}
              step={500}
            />
            <InputNumber
              min={500}
              max={100000}
              value={maxPrice}
              onChange={(e) => {setMaxPrice(e)}}
              size="large"
              style={{
                width: 100,
                'margin-left': '15px'
              }}
              step={500}
            />
          </div>
          <Slider
            min={500}
            max={100000}
            range
            value={[minPrice, maxPrice]}
            defaultValue={[
              minPrice, maxPrice
            ]}
            onChange={(e) => {setMinPrice(e[0]); setMaxPrice(e[1])}}
            step={500}
          />
        </div>

        {/* Типы жилья */}
        <div className="filter_item_wrapper_row">
          <p>Типы жилья:</p>
          <Radio.Group
            defaultValue={''}
            style={{ width: '100%', 'margin-left':'15px'}}
            onChange={(e) => {setTypeFlats(e.target.value)}}
          >
            <Row>
              <Col span={16}><Radio value="">Неважно</Radio></Col>
              <Col span={16}><Radio value="1-комнатная квартира">1-комнатная квартира</Radio></Col>
              <Col span={16}><Radio value="2-комнатная квартира">2-комнатная квартира</Radio></Col>
              <Col span={16}><Radio value="Отель">Отель</Radio></Col>
              <Col span={16}><Radio value="Студия">Студия</Radio></Col>
              <Col span={16}><Radio value="Мини-гостиница">Мини-гостиница</Radio></Col>
              <Col span={16}><Radio value="Апартамент">Апартамент</Radio></Col>
              <Col span={16}><Radio value="Хостел">Хостел</Radio></Col>
            </Row>
          </Radio.Group>
        </div>

        {/* Удобства */}
        <div className="filter_item_wrapper_row">
          <p>Удобства:</p>
          <Checkbox.Group
            style={{ width: '100%', 'margin-left':'15px'}}
            onChange={(e) => {setComfort(e)}}
          >
            <Row>
              <Col span={16}><Checkbox value='wifi'>Вай-фай</Checkbox></Col>
              <Col span={16}><Checkbox value='towel'>Полотенце</Checkbox></Col>
              <Col span={16}><Checkbox value='bed_linen'>Постельное</Checkbox></Col>
              <Col span={16}><Checkbox value='tv'>Телевизор</Checkbox></Col>
              <Col span={16}><Checkbox value='drier'>Фен</Checkbox></Col>
              <Col span={16}><Checkbox value='microwave'>Микроволновка</Checkbox></Col>
              <Col span={16}><Checkbox value='electric_kettle'>Электрический чайник</Checkbox></Col>
              <Col span={16}><Checkbox value='balcony'>Балкон/лоджия</Checkbox></Col>              
            </Row>
          </Checkbox.Group>
        </div>

        {/* Правила размещения */}
        <div className="filter_item_wrapper_row">
          <p>Правила размещения:</p>
          <Checkbox.Group
            style={{ width: '100%', 'margin-left':'15px'}}
            onChange={(e) => {console.log('checked = ', e)}}
          >
            <Row>
              <Col span={16}>
                <Checkbox value="microwave">Микроволновка</Checkbox>
              </Col>
              <Col span={16}>
                <Checkbox value="utug">Утюг</Checkbox>
              </Col>
              <Col span={16}>
                <Checkbox value="balcony">балкон</Checkbox>
              </Col>
              <Col span={16}>
                <Checkbox value="D">Микроволновка</Checkbox>
              </Col>
              <Col span={16}>
                <Checkbox value="E">Микроволновка</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </div>
        
        {/* Спальные места */}
        <div className="filter_item_wrapper_row">
          <p>Спальные места:</p>
          <span style={{'margin':'-8px 0 5px 15px'}}>односпальные</span>
          <Radio.Group
            defaultValue={1}
            style={{ width: '100%', 'margin-left':'15px'}}
            onChange={(e) => {console.log('checked = ', e.target.value)}}
          >
            <Row>
              <Col span={16}>
                <Radio value={1}>Неважно</Radio>
              </Col>
              <Col span={16}>
                <Radio value={2}>Утюг</Radio>
              </Col>
              <Col span={16}>
                <Radio value={3}>балкон</Radio>
              </Col>
              <Col span={16}>
                <Radio value={4}>Микроволновка</Radio>
              </Col>
              <Col span={16}>
                <Radio value={5}>Микроволновка</Radio>
              </Col>
            </Row>
          </Radio.Group>
          <span style={{'margin':'10px 0 5px 15px'}}>двухспальные</span>
          <Radio.Group
            defaultValue={1}
            style={{ width: '100%', 'margin-left':'15px'}}
            onChange={(e) => {console.log('checked = ', e.target.value)}}
          >
            <Row>
              <Col span={16}>
                <Radio value={1}>Неважно</Radio>
              </Col>
              <Col span={16}>
                <Radio value={2}>Утюг</Radio>
              </Col>
              <Col span={16}>
                <Radio value={3}>балкон</Radio>
              </Col>
              <Col span={16}>
                <Radio value={4}>Микроволновка</Radio>
              </Col>
              <Col span={16}>
                <Radio value={5}>Микроволновка</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </div>

        {/* <button onClick={onClickAcceptFilters}>Принять фильтры</button> */}
      </ConfigProvider>
    </>
  )
}

export default Filter;