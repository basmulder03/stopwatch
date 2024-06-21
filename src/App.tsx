import './App.css'
import {useEffect, useState} from "react";
import {DateTime} from "luxon";

function App() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [millis, setMillis] = useState(0);
    const [timer, setTimer] = useState<number | null>(null);
    const [time, setTime] = useState<DateTime>(DateTime.now());

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "r") {
                timer && clearInterval(timer);
                setMinutes(0);
                setSeconds(0);
                setMillis(0);
                setTimer(null);
            }
            else if (e.key === " ") {
                setTime(DateTime.now())
                if (!timer) {
                    const interval = setInterval(() => {
                        const currTime = DateTime.now();
                        const diff = currTime.diff(time, ['minutes', 'seconds', 'milliseconds']);
                        setMinutes(diff.minutes);
                        setSeconds(diff.seconds);
                        setMillis(diff.milliseconds);
                    }, 1)
                    setTimer(interval)
                } else {

                    clearInterval(timer);
                }
            }

        }

        window.addEventListener("keyup", listener);

        return () => {
            window.removeEventListener("keyup", listener);
            timer && clearInterval(timer);
        }
    }, [])

    return (
        <div className="main">
            <div className="timer">
                <span className="minutes">{minutes.toString().padStart(2, '0')}</span>
                <span className="seconds">:{seconds.toString().padStart(2, '0')}</span>
                <span className="millis">.{millis.toString().padStart(3, '0')}</span>
            </div>
        </div>
  )
}

export default App
