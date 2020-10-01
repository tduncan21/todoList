import React from 'react';


const Navigation = ({ saveTodos, isSignedIn, setIsSignedIn }) => {

    const handleSignOut = () => {
        setIsSignedIn(false);
	}

	if(isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={handleSignOut} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
				<p onClick={saveTodos} className='f3 link dim black underline pa3 pointer'>Save Todos</p>
			</nav>
		);		
	} else {
		return (
			<div style={{display: 'flex', justifyContent: 'flex-end', visibility: 'hidden'}}>
				<p className='f3 link dim black underline pa3 pointer'>Sign in</p>
				<p className='f3 link dim black underline pa3 pointer'>Register</p>
			</div>
		);	
	}		
}

export default Navigation