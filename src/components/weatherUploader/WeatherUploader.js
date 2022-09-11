import React from 'react';
import Day from '../day/Day';
import "./WeatherUploader.css";

class WeatherUploader extends React.Component {
  constructor(props) {
    super(props)
    const { city = "Izhevsk", setActiveDay, activeDay, weather } = props;
    this.weather = weather;
    this.activeDay = activeDay;
    this.setActiveDay = setActiveDay;
    this.city = city;
    this.weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&lang=ru&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27`;
  }

  state = {
    days: []
  }

  componentDidMount = () => {
    if (this.weatherURL) {
      fetch(this.weatherURL)
        .then(res => res.json())
        .then(data => {
          const dailyData = data.list.filter(reading => (new Date(reading.dt_txt).getDate() >= new Date().getDate()))
          this.setState({ days: dailyData })
        })
    }
  }

  render() {
    let dailyData = {};
    this.state.days.forEach(day => {
      let dayDate = new Date(day.dt_txt).toLocaleDateString();
      if (!dailyData[dayDate]) {
        dailyData[dayDate] = [];
      }
      dailyData[dayDate].push(day);
    })
    return (
      <div
        className="weather">
        {Object.keys(dailyData).map((day, index) => {
          return <Day
            key={index}
            dailyData={dailyData[day]}
            ActiveDay={this.activeDay}
            setActiveDay={this.setActiveDay}>
          </Day>
        })}
      </div>
    )
  }
}

export default WeatherUploader