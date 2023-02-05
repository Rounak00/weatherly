//https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=
//https://api.weatherbit.io/v2.0/current?&city=${search}&key=${process.REACT_APP_SECRET_KEY}&include=minutely
 import { useState } from "react";
 import styled from "styled-components";
 import { ToastContainer, toast } from 'react-toastify'
 import 'react-toastify/dist/ReactToastify.css'
 import { FaSearchLocation } from "react-icons/fa";
 import { ImLocation2 } from "react-icons/im";
 import { FiWind } from "react-icons/fi";
 import { WiHumidity } from "react-icons/wi";
 import { CgArrowsShrinkH } from "react-icons/cg";

 const View=styled.div`
   height: 100vh;
   width: 100%;
   background-color: #55D6F4;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
 `
 const Heading=styled.p`
  font-size: 2rem;
  background: -webkit-linear-gradient(violet,purple);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
 `
 const MainBox=styled.div`
   height: 70vh;
   width: 60vh;
   display: flex;
   flex-direction: column;
   /* justify-content: center; */
   align-items: center;
   background-color: #F0F0F0; 
   margin-top: 2rem;
   border-radius:3%;
   -webkit-box-shadow: 9px 13px 99px -18px rgba(0,0,0,0.99);
   -moz-box-shadow: 9px 13px 99px -18px rgba(0,0,0,0.99);
   box-shadow: 9px 13px 99px -18px rgba(0,0,0,0.99);
   @media (max-width:520px){
    height: 50vh;
   width: 40vh;
   }
 `
const SearchBox=styled.div`
    width: 100%;
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
`
const Location=styled.div`
 margin-top: 5rem;
 width: 100%;
 height: 4rem;
 display: flex;
 justify-content: center;
 font-size: 2rem;
 @media (max-width:520px){
     margin-top: 1rem;
     font-size: 1rem;
   }
` 
const Locationpara=styled.p`
  font-size: 2rem;
  font-weight: 600;
  @media (max-width:520px){
     font-size: 1rem;
   }
`
const Temparature=styled.div`
   width: 100%;
   height: 7rem;
   display: flex;
   justify-content: flex-start;
   align-items: center; 
   flex-direction: column;
   flex-wrap: wrap;
`
const PrimaryTemp=styled.div`
     height: 5rem;
     width:auto;
     background-color: #55D6F4;
     opacity:0.3;
     display: flex;
     justify-content: center;
     align-items: center;
     
`
const PrimaryTempPara=styled.p`
    color: black;
    font-size: 2rem;
    font-weight: 300;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    
`
const SecondaryTemp=styled.p`
    display: flex;
     justify-content: center;
     align-items: center;
     margin-left: 0.3rem;
     color:#2996AF;
     margin-top: 0.5rem;
`
const WeatherDetailHeading=styled.p`
     margin-top: 1rem;
     font-size: larger;
     border-bottom:solid #55D6F4;
`
const WeatherDetail=styled.div`
     height: 4rem;
     width: 100%;
     margin-top: 2rem;
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: center;
     @media (max-width:520px){
      margin-top: 0.5rem;
     }
`
const Detail=styled.div`
     display: flex;
     flex-direction:row;
     align-items: center;
     justify-content: center;
     margin: 1rem;
`
const DetailSign=styled.div`
    font-size:3rem;
    color:#545454;
    @media (max-width:520px){
      font-size:1.5rem;
    }
`
const DetailHeading=styled.p`
  color:#545454;
  margin-top:0.3rem;
  @media (max-width:520px){
      font-size: 0.5rem;
    }

`

const Nodata=styled.p`
  color:#2996AF;
  font-size:1rem;
  font-weight:300;
  margin-top:5rem;
  @media (max-width:520px){
         font-size: 0.5rem;
  }
`
function App() {
  const [search,setSearch]=useState("");
  const [city,setCity]=useState(null);


  const f=async()=>{
      toast("Result Found");
      const res=await fetch(`https://api.weatherbit.io/v2.0/current?&city=${search}&key=${process.env.REACT_APP_SECRET_KEY}&include=minutely`);
      const result=await res.json();
      setCity(result.data[0]);
      
      
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      f();
    }
  }
  /* useEffect(()=>{
       const fetchAPI=async()=>{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_SECRET_KEY}`;
        const response=await fetch(url);
        const result=response.json();
        setCity(result);
       };
      fetchAPI();
  },) */
  // console.log(process.env.REACT_APP_SECRET_KEY);
  return (
    <>
      <ToastContainer/>
      <View>
       <Heading>Weatherly</Heading> 
       <MainBox>
          <SearchBox>
             <input style={{padding: "1rem",height: "2rem",backgroundColor: "#D9D9D9",border: "none",boxShadow: "4px 11px 7px -8px rgba(0,0,0,0.75)",borderRadius: "5rem",}} placeholder="Search With City Name" type="Search" onKeyDown={handleKeyDown} onChange={(event)=>{setSearch(event.target.value)}} autoComplete="off"></input>
             <FaSearchLocation style={{color:"#55D6F4", marginLeft:"1rem", fontSize:"1.5rem",}} onClick={f}></FaSearchLocation>
          </SearchBox>

          {
            !city ? (<Nodata> No Data Search With your Correct City Name</Nodata>) : (
              <>
              <Location>
              <ImLocation2 style={{color:"#55D6F4",  marginRight:"1rem"}}></ImLocation2>
              <Locationpara>{`${city.city_name} , ${city.country_code}`}</Locationpara>
          </Location>
          <Temparature>
                <PrimaryTemp><PrimaryTempPara>{`${city.app_temp}° | ${city.weather.description}`}</PrimaryTempPara></PrimaryTemp>
                <SecondaryTemp>{`Min : ${city.app_temp-4}° | Max: ${city.app_temp+5}°`}</SecondaryTemp>
          </Temparature>
          <WeatherDetailHeading>: Weather Info : </WeatherDetailHeading>
          <WeatherDetail>
              <Detail>
                 <DetailSign><FiWind/></DetailSign>
                 <div style={{marginLeft:"0.5rem"}}><p style={{color:"#545454", fontWeight:"900", fontSize:"1rem"}}>{`${city.wind_spd}`}</p> <DetailHeading >Speed</DetailHeading></div>
              </Detail>
              <Detail>
                 <DetailSign><CgArrowsShrinkH/></DetailSign>
                 <div style={{marginLeft:"0.5rem"}}><p style={{color:"#545454", fontWeight:"900", fontSize:"1rem"}}>{`${city.pres}`}</p> <DetailHeading >Pressure</DetailHeading></div>
              </Detail>
              <Detail>
                 <DetailSign><WiHumidity/></DetailSign>
                 <div style={{marginLeft:"0.5rem"}}><p style={{color:"#545454", fontWeight:"900", fontSize:"1rem"}}>{`${city.aqi}`}</p> <DetailHeading >AQI</DetailHeading></div>
              </Detail>
          </WeatherDetail>
          </>
            )
          }
          
       </MainBox>
      </View>    
    </>
  );
}

export default App;
