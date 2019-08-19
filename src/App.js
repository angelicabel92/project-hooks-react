import React, { useState, useEffect, Fragment } from 'react';

const DateComponent = ({date, index, removeDates}) => {
  return (
    <div className="cita">
      <p>Mascota: <span>{date.mascota}</span></p>
      <p>Dueño: <span>{date.propietario}</span></p>
      <p>Fecha: <span>{date.fecha}</span></p>
      <p>Hora: <span>{date.hora}</span></p>
      <p>Sintomas: <span>{date.sintomas}</span></p>
      <button 
      onClick={() => removeDates(index)} 
      type="button" 
      className="button eliminar u-full-width">Eliminar X</button>
    </div>
  )
}

const FormComponent = ({getDates}) => {
  const initialState = {
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  }

  const [date, setDate] = useState (initialState);

  const handleChange = e => {
    e.preventDefault();
    setDate ({
      ...date,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    // Pasar la cita al componente padre
    getDates(date);
    //Reiniciar State
    setDate(initialState)
  }

  return (
    <Fragment>
      <h5>Crear Cita</h5>
      <form onSubmit={handleSubmit}>
            <label>Nombre Mascota</label>
            <input 
              type="text" 
              name="mascota"
              className="u-full-width" 
              placeholder="Nombre Mascota"
              onChange={handleChange}
              value={date.mascota}
            />

            <label>Nombre Dueño</label>
            <input 
              type="text" 
              name="propietario"
              className="u-full-width"  
              placeholder="Nombre Dueño de la Mascota"
              onChange={handleChange}
              value={date.propietario}
            />

            <label>Fecha</label>
            <input 
              type="date" 
              className="u-full-width"
              name="fecha"
              onChange={handleChange}
              value={date.fecha}
            />               

            <label>Hora</label>
            <input 
              type="time" 
              className="u-full-width"
              name="hora"
              onChange={handleChange}
              value={date.hora}
            />

            <label>Sintomas</label>
            <textarea 
              className="u-full-width"
              name="sintomas"
              onChange={handleChange}
              value={date.sintomas}
            ></textarea>

            <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
  </Fragment>
   );
}
 
const App = () => {
  let initialDates = JSON.parse(localStorage.getItem('dates'));
  if (!initialDates) {
    initialDates= [];
  } 

  const [dates, setDates] = useState(initialDates);

  const getDates = (date) => {
    const newDates = [...dates, date];

    setDates(newDates);
  }

  const removeDates = index => {
    const newDates = [...dates];
    newDates.splice(index, 1);

    setDates(newDates);
  }

  useEffect(() => {
    let initialDates = JSON.parse(localStorage.getItem('dates'));

    if (initialDates) {
      localStorage.setItem('dates', JSON.stringify(dates));
    } else {
      localStorage.setItem('dates', JSON.stringify([]));
    }
  }, [dates]);

  const title = Object.keys(dates).length === 0 ? "No hay citas" : 'Administrar las citas Aquí';

  return ( 
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <FormComponent getDates={getDates}/>
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {dates.map((date, index) => (
              <DateComponent key={index} index={index} date={date} removeDates={removeDates}/>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
   );
}
 
export default App;