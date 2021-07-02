import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { selectFlight } from '../actions';
import { connect } from 'react-redux';

function ListFlight(props) {
  const { flights } = props;
  console.log("flights");
  console.log(flights);

  const onSelectFlight = (flight, value) => {
    flight.totalPrice = flight.price.value + flight.price.tax;
    props.selectFlight(flight);
    console.log(value)
  }

  const renderedList = flights.map(flight => {
    return (
      <tr key={flight.flightId}>
        <td>{flight.startFrom}</td>
        <td>{flight.destination}</td>
        <td>
          <FormControlLabel value="Eco"
            checked={props.selectedFlight && flight.flightId === props.selectedFlight.flightId && props.selectedFlight.type === 'Eco'}
            onChange={() => onSelectFlight({...flight, type: 'Eco', price: flight.price.Eco})}
            control={<Radio />} label="Eco" /><br/>{flight.price.Eco.value} VNĐ</td>
        <td>
          <FormControlLabel value="SkyBOSS"
            checked={props.selectedFlight && flight.flightId === props.selectedFlight.flightId && props.selectedFlight.type === 'SkyBOSS'}
            onChange={() => onSelectFlight({...flight, type: 'SkyBOSS', price: flight.price.SkyBOSS})}
            control={<Radio />} label="SkyBOSS" /><br/>{flight.price.SkyBOSS.value} VNĐ</td>
        <td>
          <FormControlLabel value="Deluxe"
            checked={props.selectedFlight && flight.flightId === props.selectedFlight.flightId && props.selectedFlight.type === 'Deluxe'}
            onChange={() => onSelectFlight({...flight, type: 'Deluxe', price: flight.price.Deluxe})}
            control={<Radio />} label="Deluxe" /><br/>{flight.price.Deluxe.value} VNĐ</td>
      </tr>
    )
  })

  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Điểm khởi hành</th>
          <th>Điểm đến</th>
          <th>Eco</th>
          <th>SkyBoss</th>
          <th>Deluxe</th>
        </tr>
      </thead>
      
      <tbody>
        {renderedList}
      </tbody>
    </table>
  )
}

const mapStateToProps = (state) => {
  console.log("state")
  console.log(state);
  return {
    selectedFlight: state.selectedFlight
  }
}

export default connect(mapStateToProps, { selectFlight })(ListFlight);
