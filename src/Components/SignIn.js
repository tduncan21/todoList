import React from 'react';
import { useHistory } from 'react-router-dom';


const SignIn = ({ getTodos, setUser, userInfo, setUserInfo, setIsSignedIn}) => {

    const history = useHistory();

    const onEmailChange = (event) => {
		setUserInfo({...userInfo, email: event.target.value});
	}

	const onPasswordChange = (event) => {
		setUserInfo({...userInfo, password: event.target.value});
    }
    
    const onSubmitSignIn = () => {
        // Database call
        fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: userInfo.email,
				password: userInfo.password
			})
        })
        .then(response => response.json())
        .then(returnedUser => {
            if(returnedUser.id){
                setUser({name: returnedUser.name + "'s", id: returnedUser.id});
                setIsSignedIn(true);
                // getTodos()
                history.push("/todos");    
            }            
        })
        .catch(err => console.log(err));
    }

    const onRouteChange = () => {
        history.push("/register");
    }

    return(
        <article className="mw6 center bg-black-10 br3 pa3 pa4-ns mv5 ba b--black-10 shadow-5 ma0">
            <main className="pa4 black-80">
                <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
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
                    <input onClick={onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                    {<p onClick={onRouteChange} href="#0" className="f6 link dim black db pointer">Register</p> }
                </div>
                </div>
            </main>
		</article>
    );
}

export default SignIn;