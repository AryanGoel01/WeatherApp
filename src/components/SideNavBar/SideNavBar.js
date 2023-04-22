import React from 'react'
import "./SideNavBar.css"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';


const Sidenavbar = ({ data }) => {

    let dateObj = JSON.stringify(new Date(data?.dt * 1000));
    let date = dateObj.slice(1, 11);

    return (
        <>
            {data && (
                <div id="side-nav">
                    <div id="side-top">
                        <h2>{date}</h2>
                    </div>

                    <div id="side-bottom">
                        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt='weather icon'
                        />
                        <h1><DeviceThermostatOutlinedIcon />{(data.main.temp - 273.15).toFixed(2)} °C </h1>
                        <h2> <LocationOnOutlinedIcon /> {data.name}</h2>
                        
                        <h1> ° ° ° °</h1>
                    </div>
                </div>
            )}

        </>
    )
}

export default Sidenavbar;
