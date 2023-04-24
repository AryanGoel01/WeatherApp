import React, { useEffect, useState } from "react";
import "./Home.css";
import Button from '@mui/material/Button';
import { Input, TextField } from '@mui/material';
import SideNavBar from '../SideNavBar/SideNavBar';
import SingleDay from '../SingleDay/SingleDay';
import SixteenDays from '../SixteenDays/SixteenDays';
import WeeklyWeather from '../WeeklyWeather/WeeklyWeather';

const Home = () => {
    const [showToday, setShowToday] = useState(true);
    const [showWeeklyWeather, setShowWeeklyWeather] = useState(false);
    const [showSixteenDays, setShowSixteenDays] = useState(false);
    const [input, setInput] = useState("Delhi");
    const [data, setData] = useState();


    const handleToday = () => {
        setShowToday(true);
        setShowWeeklyWeather(false)
        setShowSixteenDays(false)
    }

    const handleWeek = () => {
        setShowToday(false);
        setShowWeeklyWeather(true)
        setShowSixteenDays(false)
    }

    const handleMonth = () => {
        setShowToday(false)
        setShowWeeklyWeather(false)
        setShowSixteenDays(true)
    }

    const fetchData = async () => {
        try {
            const data = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=5862b7124da170134fb3413c0e5140c9`
            )
            const res = await data.json();
            if (res.cod === "404") {
                alert("City Not Found");
            } else {
                setData(res);
            }
        } catch (err) {
            alert("City Not FOund");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        fetchData();
    };

    return (
        <div id="main">
            <div id="Side">
                <SideNavBar data={data} />
            </div>

            <div className="main-container">
                <div id="search">
                    <TextField
                        className="text_field"
                        id="outlined-basic"
                        label="City Name"
                        variant="outlined"
                        autoComplete="false"
                        placeholder="Enter CIty Name"
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <Button id="sbmtbtn" variant="contained" color="primary" onClick={handleSearch} disabled>
                        Search
                    </Button>
                </div>

                <div id="route">
                    <div className="route-div">
                        <Button
                            variant={showToday ? "contained" : "outlined"}
                            color={showToday ? "success" : "primary"}
                            onClick={handleToday}
                        >
                            Today
                        </Button>

                        <Button
                            variant={showWeeklyWeather ? "contained" : "outlined"}
                            color={showWeeklyWeather ? "success" : "primary"}
                            onClick={handleWeek} 
                            id="week"
                        >
                            Week
                        </Button>

                        <Button
                            variant={showSixteenDays ? "contained" : "outlined"}
                            color={showSixteenDays ? "success" : "primary"}
                            onClick={handleMonth}
                        >
                            Month
                        </Button>
                    </div>
                    
                    {showToday && !showWeeklyWeather && !showSixteenDays && (
                        <div>
                            <SingleDay singleData={data} />
                        </div>
                    )}

                    {!showToday && showWeeklyWeather && !showSixteenDays && (
                        <div>
                            <WeeklyWeather input={input} />
                        </div>
                    )}

                    {!showToday && !showWeeklyWeather && showSixteenDays && (
                        <div>
                            <SixteenDays input={input} />
                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}

export default Home;

