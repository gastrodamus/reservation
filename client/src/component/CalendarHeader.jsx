import React from 'react';
import moment from 'moment';

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  getMonthAndYear() {
    const month = this.props.chosenDay.format('MMMM');
    const year = this.props.chosenDay.format('Y')
    return `${month} ${year}`;
  }


  render() {
    const {onPreHandler, onNextHandler} = this.props;
    const weekdayshort = moment.weekdaysShort();
    const weekdayShortName = weekdayshort.map((day) => {
      return <th key={day} className="week-day">{day}</th>
    });


    return (
      <thead>
        <tr>
          <td colSpan='1' onClick={onPreHandler}></td>
          <td colSpan='5'>{this.getMonthAndYear()}</td>
          <td colSpan='1' onClick={onNextHandler}></td>
        </tr>
        <tr>{weekdayShortName}</tr>
      </thead>
    )
  }
}

export default CalendarHeader;