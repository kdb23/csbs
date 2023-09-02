import React, {useState, useContext} from 'react'
import { UserContext } from './context/user'
import { useHistory } from 'react-router-dom'

function SignUp() {
    
    const {setUser} = useContext(UserContext);

    const history = useHistory();

    return(
        <div>
            <form>
                <label htmlFor='username'>Username:</label>
                <input
                    type='username'
                    id='username'
                    autoComplete='off'
                />
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        autoComplete='off'
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SignUp