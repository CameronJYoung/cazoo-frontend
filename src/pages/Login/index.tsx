import React from 'react'

import styles from './Login.module.scss'
import useFormField from '../../hooks/useFormField'

function Login() {
	const usernameField = useFormField();
	const passwordField = useFormField();

	const submitLogin = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const userDetails = {
			username: usernameField.value,
			password: passwordField.value
		}
		console.log(userDetails);
	}

	return (
		<div className={styles.Login}>
			<form autoComplete="off">
				<div className={styles.fieldContainer}>
					<label htmlFor="username">Username:</label>
					<input type="name" id="username" {...usernameField}></input>
				</div>
				<div className={styles.fieldContainer}>
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" {...passwordField}></input>
				</div>

				<button onClick={(e) => {submitLogin(e)}} >Login</button>
			</form>
		</div>
	)
}

export default Login
