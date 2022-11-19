import "./AddNote.css";
import { useEffect, useState } from "react";
import { useRef } from "react";

const AddNote = () => {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const textRef = useRef(null);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(0);
  
// Add to local Storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);


// create new todo
  const addNewTodo = () => {

    if(editId){
      const editTodo = todo.find((i)=> i.id === editId)
      const updatedTodos= todo.map((t)=>t.id === editTodo.id?(
      t={id:t.id,todo}):{id:t.id,todo: t.todo})
      setTodo(updatedTodos);
      setEditId(0)
      setNewTodo('')
      return;
    }

   
    if (newTodo) {
      let num = todo.length + 1;
      let newEntry = {
        id: num,
        title: newTodo,
        status: false,
      };
      setTodo([...todo, newEntry]);
      setNewTodo("");
    }
    
  }
    //  const handleChange = (todo) => {
     
      
    //   };

      const handleEdit = (id) => {
        
        const editTodo = todo.find((i)=>i.id ===id)
        setTodo(editTodo.newTodo);
        setEditId(id)
           textRef.current.value = id.title;
      }

  return (
    <>
 
      <div className="add-note">
        <span className="add-noteno">
          
          {todo && todo.length ? "" : "Нет Запись"}
        </span>
        {todo &&
          todo.map((el, i) => 
             <button
              className="add-btn"
              onClick={() =>handleEdit(el.id)}
              key={el.id}
            >
              Запись {el.id}
            </button>   
          ) }
          
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
            <form >
            <textarea
              type="text"
              ref={textRef}
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              name="text"
              className="note-textarea"
            />
          </form>
      
          <button onClick={() => addNewTodo() } className="save-btn">
            {editId? "izmenit" : "сохранить"}
            
          </button>
        </div>
      )}
    </>
  );
  }

  

  



export default AddNote;
