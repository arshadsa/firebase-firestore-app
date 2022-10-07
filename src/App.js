import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase.config";
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";

function App() {
  const [user, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");
  const [name, setName] = useState([]);
  const [age, setAge] = useState([]);

  const createUser = async ()=> {
    await addDoc(userCollectionRef, {name, age});
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const Fields = {age: age+1};
    await updateDoc(userDoc, Fields);
  }
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  return (
    <div className="App">
      <input placeholder="name" onChange={(event)=>{setName(event.target.value)}} />
      <input type='number' placeholder="age" onChange={(event)=>{setAge(event.target.value)}} />

      <button onClick={createUser}>Submit</button>
      {user.map((user) => {
        return (
          <div>
            {" "} 
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button onClick={()=>updateUser(user.id, user.age)}>Increase Age</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
