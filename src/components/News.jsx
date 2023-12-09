import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;


export const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory ] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12}); 
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.articles) return 'Loading...';

  return (
    <Row gutter= {[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className ="select-news"
              placeholder="Select a Crypto"
              optionFilterProp= "children"
              onChange={(articles) => setNewsCategory(articles)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)}
              >
                <Option value="Cryptocurrency">Cryptocurrency</Option>
                {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}

            </Select>
          </Col>
        )}
        {cryptoNews.articles.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key = {i} >
            <Card hoverable className ="news-card">
              <a href={news.url} target = "_blank" rel='noreferrer'>
                < div className="news-image-container" >
                  <Title className="news-title" level={4}>{news.title}</Title>
                </div>
              </a>
            </Card>


          </Col>

        ))}
    </Row>
  )
}

export default News