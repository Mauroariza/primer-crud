import { useState } from "react";
import {nanoid} from 'nanoid' // esto me crea nuevos id cortos, es una librería

/*
setTareas([...tareas,{id:nanoid(10),NombreTarea:tarea}]);


*/

function App() {

 
  const[tarea,setTarea]= useState('')// el string vacío lo relacionamos con el input del formulario
  const[tareas,setTareas] = useState([])// aquí hago la lista de tareas
  const[modoEdicion,setModoEdicion]=useState(false) // es falso porque luego el formulario cambia a editar, entonces debe permanecer en falso.
  const[id,setId]= useState('')
  const[error,setError]=useState(null)





//**********************************FUNCIÓN AGREGAR TAREA********************************************
 
 const agregarTarea = e =>{
  e.preventDefault(); //para que no cargue la página otra vez
   
   if(!tarea.trim()){ // valido si hay texto. si no hay nada escrito en agregar
     console.log('elemento vacío') //valido que esto sí tenga algo dentro
     setError('Escriba algo por favor...')
     return // si sale en return ya no va a console.log(tarea)
   }
   console.log(tarea) // pinta lo que le ponga en agregar
   // este console lo bajo por si se cumple lo anterior entonces no se pinta tarea
  
   setTareas([ // esto es para imprimir todas las tareas, modifica a tareas
     ...tareas,
     {id:nanoid(5),nombreTarea:tarea} // esto funciona porque está dentro de
     // agregarTarea así que va a aparecer en el state en components. 
     //nanoid genera un id random
     // en :tarea estoy haciendo la conexión con setTareas
   ])
    setTarea(' ')// lo que ponga aquí cambiará lo que ponga como tarea.
    // está conectado con value= {tarea}
    setError(null)
 }



 //**************************************FUNCIÓN EDITAR TAREA********************************************
 const editarTarea = e => {
  e.preventDefault(); //para que no cargue la página otra vez
      if(!tarea.trim()){ // si no hay nada escrito en editar
      console.log('elemento vacío') //valido que esto sí tenga algo dentro
      setError('Escriba algo por favor...')
      return
      }
 const arrayEditado = tareas.map( item=>item.id ===id ? {id: id,nombreTarea:tarea} : item  ) 
 // si es cierto devolvemos el id editado y sino entonces los otros items los devolvemos normal.
 setTareas(arrayEditado)
 setModoEdicion(false)
 setTarea('')
 setId('')
 setError(null)

}
  
 //*****************************ELIMINAR Y EDITAR BOTONES(lista tareas)******************************************


 const eliminarTarea = id =>{ // esta función se comunica con en boton y  onClick
  //console.log(id)
  const arrayFiltrado = tareas.filter(item=> item.id !== id )
  // con este array filtrado elimino al id que seleccione en el botón eliminar 

  setTareas(arrayFiltrado) // modifica nuestro array filtrando los datos que sí van
}

const editar = item => {
  console.log(item)
  setModoEdicion(true)
  setTarea(item.nombreTarea)
  setId(item.id)
 }

 
 


//ANCHOR ---------------------------------------RETURN-----------------------------------------
  return (
  < div className="container mt-5">
        <h1 className='text-center'>CRUD Simple</h1>
        <hr />
        <div className="row">
        <div className="col-8"> 
          <h4 className="text-center">Lista de tareas</h4>
  <ul className="list-group">
         
            {
              tareas.length === 0 ? ( <li className="list-group-item">No hay tareas</li>) : (
                tareas.map(item => (
   <li className='list-group-item' key= {item.id}>
          <span className="lead"> {item.nombreTarea} </span>
          
                 
       <button className="btn btn-danger btn-sm float-end mx-2"onClick ={()=> eliminarTarea(item.id) } >
         Eliminar
       </button>

        <button className="btn btn-warning btn-sm float-end"onClick ={()=>editar(item)} > 
        Editar
        </button>
    </li> )))

          }
        
   </ul>
  </div>

      
     <div className="col-4">
          <h4 className="text-center"> 
          {
            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea' // agregar tarea por defecto está en falso en modoEdicion
          }         
          </h4>

          <form onSubmit ={modoEdicion ? editarTarea : agregarTarea} >
            {
//NOTE on SUBMIT me ayuda a detectar lo que voy a poner dentro del formulario y para eso lo conecto. 
            error ? <span className='text-danger'>{error} </span> : null
 //el error por defecto está null, sin embargo en agregar tarea si entra al if:  vacío, se activa
 //el error está relacionado a un hook 
            }


    <input 
            //ANCHOR el INPUT está relacionado con useState de Tarea
            type="text" 
            className="form-control mb-2" 
            placeholder = 'ingrese tarea' // esto aparece si no hay nada adentro
            onChange={e => setTarea(e.target.value)  } //me detecta lo que escribo, con el hook
            
           //NOTE el value se conecta con setTarea
           value ={tarea} // esto va relacionado con setTarea('') de useState
           // el value funciona diferente para agregarTarea y para editarTarea
    />
            {modoEdicion ? (
            <button className="btn btn-warning btn-block " type='submit'> Editar</button>

            ):(
               <button className="btn btn-dark btn-block " type='submit'> Agregar</button>
                )
          
          
          }

          </form>
      </div>


     </div>
      
     
   </div>
  );
}

export default App;
