import React from "react";
import "./Board.css";

class Board extends React.Component {
    constructor(props) {
        super(props);
        const { activeDay, setActiveDay } = props;
        this.state = { activeDay }
        this.setActiveSlot = setActiveDay;
    }

    openData(data) {
        const speedWind = Math.round(data.wind.speed);
        const temp = Math.round(data.main.temp);
        const tempFeels = Math.round(data.main.feels_like)
        const pressure = Math.round(data.main.pressure * 0.750062);
        const description = data.weather[0].description;
        const src = `${data.weather[0].main}.png`
        let degWind;
        switch (Math.round(data.wind.deg / 45)) {
            case 0: degWind = 'С 🡩'
                break;
            case 1: degWind = 'СВ 🡭'
                break;
            case 2: degWind = 'В 🡪'
                break;
            case 3: degWind = 'ЮВ 🡶'
                break;
            case 4: degWind = 'Ю 🡳'
                break;
            case 5: degWind = 'ЮЗ 🡷'
                break;
            case 6: degWind = 'З 🡰'
                break;
            case 7: degWind = 'СЗ 🡴'
                break;
            case 8: degWind = 'С 🡩'
                break;
        }

        return {
            speedWind: speedWind,
            degWind: degWind,
            temp: temp,
            tempFeels: tempFeels,
            pressure: pressure,
            description: description,
            src: src
        }
    }

    setActiveSlot(name) {
        this.setState({ activeDay: name });
        this.setActiveSlot(this.state.activeDay);
    }

    render() {
        return (
            <div className="Board"
                onClick={() => this.setActiveSlot(undefined)}
            >
                <h1 className="text">{new Date(this.state.activeDay[0].dt_txt).toLocaleString('ru', { weekday: 'long' })}</h1>
                <h2 className="text">{new Date(this.state.activeDay[0].dt_txt).toLocaleDateString()}</h2>
                {this.state.activeDay.map((data, index) => {
                    const { speedWind, degWind, temp, tempFeels, pressure, description, src } = this.openData(data);
                    console.log(src);
                    return (<div
                        key={index}
                        className="day"
                        style={{
                            background: `url(${src})`,
                            backgroundSize: '100%',
                            backgroundColor: 'white'
                        }}>
                        <h3 className="text">{new Date(data.dt_txt).toLocaleTimeString()}</h3>
                        <a className="temp">{temp} °C</a>

                        <a className="text">{'Ощущается: '}{tempFeels} °C</a>

                        <a className="text">{'Ветер: '}{speedWind} м/с {degWind}</a>

                        <a className="text">{'Давление: '}{pressure}</a>

                        <a className="text">{'Погода: '}{description}</a>
                    </div>)
                })}
            </div>
        )
    }
}

export default Board;