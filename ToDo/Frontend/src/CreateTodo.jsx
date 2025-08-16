import { useState } from 'react';
export default function CreateTodo({ fetchtodos }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return (
        <>
            <input type="text" placeholder="title" onChange={e => { return setTitle(e.target.value) }} />
            <input type="text" placeholder="description" onChange={e => setDescription(e.target.value)} />
            <button onClick={async () => {
                console.log(JSON.stringify(title), JSON.stringify(description))
                const response = await fetch('http://localhost:3000/todo', {
                    method: 'POST',
                    body: JSON.stringify({ title, description }),
                    headers: { 'Content-Type': 'application/json' }
                })
                const value = await response.json();
                fetchtodos();
                console.log(value);
            }}>damn bro</button>

        </>
    )
}