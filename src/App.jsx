import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

    // useEffect(() => {
    //     saveToLS();
    // }, [todos]);

  useEffect(() => {
    const exist = localStorage.getItem("todos");
    if (exist) {
      const storedTodos = JSON.parse(exist);
      settodos(storedTodos); // Update state with stored todos
      // console.log(storedTodos);
    }
  }, [])
  

  const saveToLS=(param)=>{
    localStorage.setItem("todos", JSON.stringify(param))
    console.log("printing local storage", localStorage);
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    settodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
    saveToLS();
};


  const handleDelete=(e, id)=>{
    
    let newtodos=todos.filter(item=>{
      return item.id !== id;
    });
    settodos(newtodos);
    saveToLS();
  }
  const handleClear=()=>{
    settodos([]);
    saveToLS();
  }

  const handleCheckBox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newtodos=[...todos];
    newtodos[index].isCompleted=!newtodos[index].isCompleted;
    settodos(newtodos);
    saveToLS();
  }

  const handleAdd=()=>{
      settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
      console.log(todos);
      settodo('');
      saveToLS(todos);
  }

  // const handleEnter=(event)=>{
  //   if(event.keyCode===13){
  //     const newTodo = { id: uuidv4(), todo: todo, isCompleted: false };
  //   settodos([...todos, newTodo]);
  //   settodo('');
  //   saveToLS();
  //   }
    
// }

  const handleChange=(e)=>{
    settodo(e.target.value);
  }
  return (
    <>
    <Navbar/>
      <div className="box mx-auto my-5 bg-slate-300 p-5 py-1 rounded-xl min-h-[80vh]">
        <div className="addtodo">
          <h2 className="text-lg font-bold">Add a ToDo</h2>
          <input onChange={handleChange} type="text" className='w-1/2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-1.5' value={todo}/>
          <button onClick={handleAdd} className='buttons bg-slate-700 hover:bg-slate-900 text-white p-2 rounded-md mx-6 text-sm'>Save</button>
        </div>
        <br />
        <div className="cap flex">
        <h2 className='text-xl font-bold'>Your ToDo's</h2>
        <button className='buttons bg-slate-700 hover:bg-slate-900 text-white p-2 rounded-md mx-20 text-sm' onClick={handleClear}>Clear</button>
        </div>
        <br />

        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todo's to Display</div>}
          {todos.map(item=>{
            return <div key={item.id} className="todo flex my-3 justify-between w-1/3">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckBox} type="checkbox" value={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              
            
            <div className="flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className='buttons bg-slate-700 hover:bg-slate-900 text-white p-2 rounded-md mx-2 text-sm'><MdEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='buttons bg-slate-700 hover:bg-slate-900 text-white p-2 rounded-md mx-2 text-sm'><MdDelete /></button>
            </div>
          </div>
          })}
          
        </div>
      </div>
    </>
  )
}

export default App
