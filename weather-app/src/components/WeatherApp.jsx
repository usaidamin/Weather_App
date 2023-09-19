import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import WeatherAppCss from "../css/weather.module.css"



const WeatherApp = () => {
    const [search, setSearch] = useState("Karachi");
    const [weatherData, setWeatherData] = useState({});
    let componentMounted = true;

    useEffect(()=>{
        
        fetchWeatherData();
    },[])

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=893bce105b0dfd459e759c7ee85d369b`)
            if(componentMounted){
                setWeatherData(response.data)
                console.log(setWeatherData)
            }
            return()=>{
                componentMounted = false;
               }
        } catch (error) {
            console.log(error.message)
        }
    }
    console.log("WeatherData", weatherData)

    const WeatherApi = (e) => {
        e.preventDefault();
        fetchWeatherData(search)
      };
    let emoji = null;
    if(typeof weatherData.weather && weatherData.main != "undefined")
    {
        if(weatherData.weather && weatherData.weather[0].main == "Clouds"){
            emoji = "fa-cloud"
        }
        else if(weatherData.weather && weatherData.weather[0].main == "Thunderstorm"){
            emoji = "fa-bolt"
        }
        else if(weatherData.weather && weatherData.weather[0].main == "Drizzle"){
            emoji = "fa-cloud-rain"
        }
        else if(weatherData.weather && weatherData.weather[0].main == "Rain"){
            emoji = "fa-cloud-shower-heavy"
        }
        else if(weatherData.weather && weatherData.weather[0].main == "Snow"){
            emoji = "fa-snow-flake"
        }
        else if (weatherData.weather && weatherData.weather[0].main == "haze"){
            emoji = "fa-sun-haze"
        }
        else{
            emoji = "fa-smog"
        }
    }
    else{
        return(
            <div>...Loading</div>
        )
    }
    
    //Temperature
    let temp = (weatherData?.main?.temp - 273.15).toFixed(2);
      let temp_min = (weatherData?.main?.temp_min - 273.15).toFixed(2);
      let temp_max = (weatherData?.main?.temp_max - 273.15).toFixed(2);
      let feels_like = (weatherData?.main?.feels_like - 273.15).toFixed(2);

    //Date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let day = d.toLocaleString("default", {weekday:'long'});
    let month = d.toLocaleString("default", {month:'long'});

    //Time
    let time = d.toLocaleString([],{
        hour : "2-digit",
        minute : "2-digit",
        second : "2-digit"
    });
      
  return (
    <>
    <Container className='mt-0'>
        <Row className='justify-content-center'>
        <Col>
      <Card className='text-white text-center border-0 p-0'>
      <Card.Img src={`https://source.unsplash.com/500x700/?${weatherData?.weather && weatherData?.weather[0].main}`}
      className={`${WeatherAppCss.card}`} />
      <Card.ImgOverlay>
        <Form onSubmit={WeatherApi}>
        <InputGroup className={`mb-4 w-75 mx-auto mt-3`} onChange={(e) => setSearch(e.target.value)}>
        <Form.Control
          placeholder="Search City"
          aria-label="Search Name"
          aria-describedby="basic-addon2"
        />
        <button type='submit'>
            <i className="fas fa-search" id="basic-addon2"></i>
        </button>
      </InputGroup>
        </Form>
        <div className='bg-dark bg-opacity-50 py-3'>
        <Card.Title><h2>{weatherData?.name}</h2></Card.Title>
        <Card.Text className='lead'>
          {day}, {month} {date}, {year}
          <br />
          {time}
        </Card.Text>
        <hr />
        <i className={`fas ${emoji} fa-4x mb-4`}></i>
        <h2 className='fw-bolder mb-3'>Temp: {temp}</h2>
        <h2 className='fw-bolder mb-2'>Feels Like: {feels_like}</h2>
        <p className="lead fw-bolder mb-0">{weatherData?.weather && weatherData?.weather[0].main}</p>
        <p className="lead ">{temp_min}&deg;C | {temp_max}&deg;C</p>
        </div>
      </Card.ImgOverlay>
    </Card>
    </Col>
    </Row>
    </Container>
    
    </>
  )
  
}

export default WeatherApp
