import "./AddNote.css";
import { useEffect, useState } from "react";
import { useRef } from "react";

const AddNote = () => {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  // const textRef = useRef(null);
  const [show, setShow] = useState(false);
  const [updateData, setUpdateData] = useState('');
  
// Add to local Storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);


// create new todo
    const addNewTodo = () => {
    if (newTodo) {
      let num = todo.length + 1;
      let newEntry = {
        id: num,
        title: newTodo,
        status: true,
      }
      setTodo([...todo, newEntry]);
      setNewTodo("");
    }else if(updateData){
    let filterRecords = [...todo].filter(task => task.id !== updateData.id)
    let updatedObject = [...filterRecords, updateData]
    setTodo(updatedObject);
    setUpdateData('')
    }
  }

 const handleChange = (e, todo) => {
    // textRef.current.value = todo;
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  };

// const updateTask = () => {
//     let filterRecords = [...todo].filter(task => task.id !== updateData.id)
//     let updatedObject = [...filterRecords, updateData]
//     setTodo(updatedObject);
//     setUpdateData('')
//   }

  return (
    <>
 
      <div className="add-note">
        <span className="add-noteno">
          
          {todo && todo.length ? "" : "Нет Запись"}
        </span>
        {todo &&
          todo.map((el, i) => {el.status ? null:(<button
              className="add-btn"
              // onClick={() => handleChange(el.title)}
              key={i}
            >
              Запись {el.id}
            </button>)}
             
          )}
           
      
        <button
          className="note-btn"
          onClick={() => {
            setShow(true);
          }}
        >
 
          новая запись
        </button>
      </div>
   
      {show && (
        <div className="save-note">  
         {updateData && updateData ?(
              <form >
              <textarea
                type="text"
                // ref={textRef}
                value={updateData && updateData.title}
                onChange={(e) => handleChange(e)}
                name="text"
                className="note-textarea"
              />
            </form>
        ):(<form >
            <textarea
              type="text"
              // ref={textRef}
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              name="text"
              className="note-textarea"
            />
          </form>)}  
          
      
          <button onClick={() => addNewTodo() } className="save-btn">
            
            сохранить
          </button>
        </div>
      )}
    </>
  );
  }

 

  



export default AddNote;
