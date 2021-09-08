import React, { useContext, useRef } from 'react';
import { Redirect } from 'react-router';

import UserContext, { UserContextConsumer } from '../../contexts/UserContext';
import styles from './Home.module.scss';
import Header from '../../components/Header';
import CustomAudio from '../../components/CustomAudio';


function Home() {

	const useUser = useContext(UserContext);
	if (!useUser.authenticated) {
		return <Redirect to="login"></Redirect>
	}
	
	return (
		
		<UserContextConsumer>
			{
				({username, authenticated}) => {
					if(username && authenticated) {
						return (
							<div className={styles.Home}>
								<Header username={username}></Header>
								<CustomAudio></CustomAudio>
							</div>
						)
					}
				}
			}
		</UserContextConsumer>
		
	)

	
}

export default Home
