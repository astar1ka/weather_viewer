import { useState } from 'react';
import './App.css';
import WeatherUploader from "./components/weatherUploader/WeatherUploader";
import Board from './components/board/Board';

function App() {
  const [activeButton, setActiveButton] = useState("home");
  const [activeDay, setActiveDay] = useState(0);
  let weather = activeDay;
  return (
    <div
      className="App">
      {(activeDay) ?
        <Board
          activeDay={activeDay}
          setActiveDay={(name) => { setActiveDay(name) }}
        ></Board>
        :
        ""
      }
      <WeatherUploader
        weather={weather}
        city='Izhevsk'
        activeDay={activeDay}
        setActiveDay={(name) => { setActiveDay(name) }}>
      </WeatherUploader>
    </div>
  );
}

export default App;
