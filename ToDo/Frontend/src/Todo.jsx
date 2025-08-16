import { useEffect } from "react";
import { useState } from "react";
export default function Todo({ todo, fetchtodos }) {
    // const [todo, setTodo] = useState([]);
    const style = {
        textDecoration: "line-through"
    };
    return (

        todo.map(val => {
            if (val.completed) {
                console.log('idhar')
                return <div key={val.id} style={style}>
                    <h1>{val.title}</h1>
                    <h2>{val.description}</h2>
                    <h3>{val.id}</h3>
                </div>
            }
            return <div key={val.id}>
                <h1>{val.title}</h1>
                <h2>{val.description}</h2>
                <h3>{val.id}</h3>
                <button onClick={async () => {
                    const response = await fetch('http://localhost:3000/completed', {
                        method: 'POST',
                        body: JSON.stringify({ id: val.id }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    fetchtodos();
                    const ans = response.json();
                    console.log(ans);
                }}>Mark as Done</button>
            </div>
        })
    )
}