import './SearchBar.css'
import SearchBarBG from '../assets/pattern-bg-desktop.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import LongLatContext from '../misc/LongLatContext'
import axios from 'axios';


export default function SearchBar () {

    const [ disabled, setDisabled ] = useState(true);
    const [ inputIp, setInputIp ] = useState('');
    const [ ip, setIp ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ timezone, setTimezone ] = useState('');
    const [ isp, setIsp ] = useState('');
    const { setLong, setLat} = useContext(LongLatContext);

    const changeHandler = (e) => {

        setInputIp(e.target.value);
        
        if (e.target.value.match(/^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/))
            setDisabled(false);
        else
            setDisabled(true);
    }

    const searchIp = async () => {
        setDisabled(true);
        
        try {
            let res;
            if (ip == '')
                res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GEOIPIFY_TOKEN}`);
            else
                res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GEOIPIFY_TOKEN}&ipAddress=${inputIp}`);

                
            console.log(res.data)
            setIp(res.data.ip);
            setTimezone(res.data.location.timezone);
            setIsp(res.data.isp);

            let temp = '';
            if (res.data.location.city)
                temp += `${res.data.location.city}, `
            if (res.data.location.region)
                temp += `${res.data.location.region} `
            if (res.data.location.postalCode)
                temp += `${res.data.location.postalCode}`

            // `${res.data.location.city}, ${res.data.location.region} ${res.data.location.postalCode}`

            setLocation(temp);
            
            if (res.data.location.lng == undefined || res.data.location.lat == undefined) 
                return
            setLong(res.data.location.lng);
            setLat(res.data.location.lat);  
            setDisabled(false);
        } catch (e) {
            setDisabled(false);
        }
    }

    useEffect(() => {
        searchIp();
    }, []);

    return (
        <div className="searcharea">
            <h1>IP Address Tracker</h1>
            <div className="searchbar">
                <input value={inputIp} onChange={changeHandler} placeholder="Search for any IP address or domain" />
                <button onClick={searchIp} disabled={disabled}></button>
            </div>

            <div className="infobox">
                <div className="info">
                    <h4>IP ADDRESS</h4>
                    <p>{ ip }</p>
                </div>
                <div className="separator"></div>
                <div className="info">
                    <h4>LOCATION</h4>
                    <p>{ location }</p>
                </div>
                <div className="separator"></div>
                <div className="info">
                    <h4>TIMEZONE</h4>
                    <p>{ `UTC ${timezone}` }</p>
                </div>
                <div className="separator"></div>
                <div className="info">
                    <h4>ISP</h4>
                    <p>{ isp }</p>
                </div>
            </div>

        </div>
    )
}