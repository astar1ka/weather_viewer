import React from "react";
import "./Day.css";

class Day extends React.Component {
    constructor(props) {
        super(props);

        const { dailyData, name, onClick, type, activeDay, setActiveDay } = props;
        this.state = activeDay;
        this.setActiveDay = setActiveDay;
        this.name = name;
        this.dailyData = dailyData;
        this.weekdayDate = new Date(dailyData[0].dt_txt);
        this.isToday = (this.weekdayDate.getDate() == new Date().getDate()) ? true : false;
        this.dayData = (dailyData[5]) ? dailyData[5] : undefined;
        this.nigthData = (dailyData[1]) ? dailyData[1] : dailyData[0];
        this.nigthtemp = Math.round(this.nigthData.main.temp);
        this.daytemp = (this.dayData) ? Math.round(this.dayData.main.temp) : "--";
        this.nigthweather = this.nigthData.weather[0].description;
        this.dayweather = (this.dayData) ? this.dayData.weather[0].description : "--";
        this.src = (this.dayData && !this.isToday) ? `${this.dayData.weather[0].main}.png` : `${this.nigthData.weather[0].main}.png`;
        this.type = type;
    }

    setActiveDay(data) {
        this.setState({ activeDay: data });
        this.setActiveDay(this.state.activeSlot);
    }


    render() {
        let className = (this.isToday) ? "today" : "day";
        return (
            <div
                onClick={() => this.setActiveDay(this.dailyData)}
                className={className}
                style={{
                    background: `url(${this.src})`,
                    backgroundSize: '100%'
                }}>
                <a className="nameDay">{this.weekdayDate.toLocaleString('ru', { weekday: 'long' })}</a>
                <a className="dateDay">{this.weekdayDate.toLocaleDateString()}</a>
                {(this.isToday) ?
                    <a className="temp" margin-top="20%">{Math.round(this.nigthtemp)} °C</a>
                    :
                    <a className="temp">{this.daytemp} °C </a>}
                {(this.isToday) ?
                    <a className="weatherName">{this.nigthweather}</a>
                    :
                    <a className="weatherName">{this.dayweather}</a>
                }
                {(!this.isToday) ? <a className="tempNigth">{this.nigthtemp} °C </a> : ""}
                {(!this.isToday) ? <a className="weatherName">{this.nigthweather}</a> : ""}
            </div>
        )
    }
}

export default Day;