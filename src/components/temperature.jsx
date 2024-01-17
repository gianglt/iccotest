import React from 'react';
import { atom, selector, useRecoilValue, useRecoilState } from "recoil";
import {tempFahrenheit, tempCelsius} from '../recoil/temparatureState';

export function TemparatureValues() {
    const [tempF, setTempF] = useRecoilState(tempFahrenheit);
    const [tempC, setTempC] = useRecoilState(tempCelsius);
  
    const addTenCelsius = () => setTempC(tempC + 10);
    const addTenFahrenheit = () => setTempF(tempF + 10);
    const resetTemparature = () => setTempC(0);
  
    return (
      <div>
        Temp (Celsius): {tempC}
        <br />
        Temp (Fahrenheit): {tempF}
        <br />
        <button onClick={addTenCelsius}>Add 10 Celsius</button>
        <br />
        <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
        <br />
        <button onClick={resetTemparature}>Reset Temparature</button>
      </div>
    );
  }