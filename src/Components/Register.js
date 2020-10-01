import React from 'react';
import { useHistory } from 'react-router-dom';


const Register = ({ user, setUser, userInfo, setUserInfo, setIsSignedIn}) => {

    const history = useHistory();

    const onNameChange = (event) => {
		setUserInfo({...userInfo, name: event.target.value});
	}

    const onEmailChange = (event) => {
		setUserInfo({...userInfo, email: event.target.value});
	}

	const onPasswordChange = (event) => {
		setUserInfo({...userInfo, password: event.target.value});
    }
    
    const onSubmitRegister = () => {
        // Database call
        fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
                name: userInfo.name,
				email: userInfo.email,
				password: userInfo.password
			})
        })
        .then(response => response.json())
        .then(returnedUser => {
            if(returnedUser){
                setUser({...user, id: returnedUser[0].id});
                setUser({...user, name: returnedUser[0].name + "'s"});
                setIsSignedIn(true);
                history.push("/todos");    
            }            
        })
        .catch(err => console.log(err));
    }

    return(
        <article className="mw6 center bg-black-10 br3 pa3 pa4-ns mv5 ba b--black-10 shadow-5">
            <main className="pa4 black-80">
                <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input onChange={onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                    </div>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                </fieldset>
                <div className="">
                    <input onClick={onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                </div>
                </div>
            </main>
        </article>
    );
}

export default Register;