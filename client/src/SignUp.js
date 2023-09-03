import React, {useState, useContext} from 'react'
import { UserContext } from './context/user'
import { useHistory } from 'react-router-dom'

function SignUp() {
    
    const {setUser} = useContext(UserContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory();

    function handleSignup(e) {
        e.preventDefault();
        fetch("/users/list")
            .then(response => response.json())
            .then(users => {
                console.log(username)
                const usernames = users.map(user => user.username)
                if (usernames.includes(username)) {
                    window.alert("howdy")
                } else if (password.length < 1) {
                    window.alert("hoedy")
                }
                fetch("/users", {
                    method: "POST",
                    headers: { "Content-Type" : "application/json"},
                    body: JSON.stringify({
                        username,
                        password
                    }),
                })
                .then((response) => response.json())
                .then((data) => {
                    setUser(data)
                })
                .catch((error) => {
                    setError(error.message)
                })
            }) 
            .catch((error) => {
                setError(error.message)
            })
    }

    return(
        <div>
            <form onSubmit={handleSignup}>
                <label htmlFor='username'>Username:</label>
                <input
                    type='username'
                    id='username'
                    autoComplete='off'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        autoComplete='off'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SignUp