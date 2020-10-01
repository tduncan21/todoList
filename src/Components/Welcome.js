import React from 'react';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
    const history = useHistory();
    
    const handleSignIn = () => {
        history.push("/signin");
    }

    const handleRegister = () => {
        history.push("/register");
    }

	return (
        <article className="mw6 center bg-black-10 br3 pa3 pa4-ns mv5 ba b--black-10 shadow-5 ma0">
            <main className="pa4 black-80">
                <div className="measure" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <h1>Welcome to the Todo List!</h1>
                    <p>Here you can create and manage tasks</p>
                    <button onClick={handleSignIn} className="b ph3 ma2 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Signin</button>
                    <button onClick={handleRegister} className="b ph3 ma2 mh4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Register</button>
                </div>
            </main>
        </article>
    )
}

export default Welcome