import React, { useEffect, useState } from 'react'
import './Employee.css'
import { planillaMensual, planillaSemanal } from '../../Http/http';

const titulos = {
  salarioBruto: "salario bruto",
  totalDeducciones: "total de deducciones",
  salarioNeto: "salario neto",
  horasOrdinarias: "cantidad de horas ordinarias",
  horasExtraNormales: "cantidad de horas extra normales",
  horasExtraDobles: "cantidad de horas extras dobles",
};


const informacionSalario = {
  salarioBruto: 50000,
  totalDeducciones: 10000,
  salarioNeto: 40000,
  horasOrdinarias: 160,
  horasExtraNormales: 10,
  horasExtraDobles: 5,
};


const Employee = ({employee}) => {
  const [data, setData] = useState([titulos, informacionSalario])

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getData = () => {
    if(selectedOption === "Planilla Mensual") {
      console.log(planillaMensual())
    }
    console.log(planillaSemanal)
  }
  
  useEffect(()=>{
    setData(getData())
  },[])
  
  return (
    <div className='main'>
      <h1>{employee.Name}-{employee.Value}</h1>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Selecciona una opción</option>
        <option value="Plantilla Mensual">Planilla Mensual</option>
        <option value="Planilla Semanal">Planilla Semanal</option>
      </select>
      <h5>{selectedOption}</h5>
      <div className="ProductList">
        {data.map((item, index) => (
          <div className="Product" key={index}>
            <div className="ProductName">{item.totalDeducciones}</div>
            <div className="ProductName">{item.salarioNeto}</div>
            <div className="ProductName">{item.salarioBruto}</div>
            <div className="ProductName">{item.horasOrdinarias}</div>
            <div className="ProductName">{item.horasExtraNormales}</div>
            <div className="ProductName">{item.horasExtraDobles}</div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Employee