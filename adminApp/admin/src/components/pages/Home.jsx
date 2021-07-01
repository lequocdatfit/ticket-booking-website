import React from 'react';
import FeaturedInfo from '../featuredInfo/FeaturedInfo';
import Notification from '../notification/Notification';
import Chart from '../chart/Chart';
import './home.css';
import { userData } from '../../dummyData';
import { connect } from 'react-redux'


function Home(props) {
  return (
    <div className="homepage">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <Notification notify={props.alert} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert
  }
}

export default connect(mapStateToProps)(Home)
