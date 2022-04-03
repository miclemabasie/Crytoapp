import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi'
import { useState } from 'react';
import Loader from './Loader';
const { Option } = Select;


const { Text, Title } = Typography;
const { option } = Select;



const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const count = simplified ? 6 : 12
  const demoImageUrl = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';
  const {data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory: newsCategory, count: count })
  const { data } = useGetCryptosQuery(100)
 
  
  if(isFetching) return(<Loader />)

  console.log({cryptoNews})
  return (
    
    <Row gutter={[24, 24]}>
      {!simplified && (
      <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="select a crypto"
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin, i) => <Option key={i} value={coin.name}>{coin.name}</Option>)}
          </Select>
      </Col>
    )}
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImageUrl } />
              
              </div>
              <p>
                {news?.description > 100
                  ? `${news.description.substring(0, 100)}...` 
                  : news.description 
                }
              </p>
              <div className="provider-conatiner">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl } alt="news" /> 
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
            </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News