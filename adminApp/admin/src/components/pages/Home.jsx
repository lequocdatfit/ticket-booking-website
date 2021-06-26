import React from 'react';
import FeaturedInfo from '../featuredInfo/FeaturedInfo';
import Chart from '../chart/Chart';
import './home.css';
import { userData } from '../../dummyData';

function Home() {
  return (
    <div className="homepage">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
    </div>
  )
}

export default Home
