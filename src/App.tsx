import React, { useState, useContext, useEffect } from 'react'

import UserContext, { UserContextProvider } from './contexts/UserContext';
import AppRouter from './components/AppRouter';

function App() {
  	return (
		<UserContextProvider value={
			{
				authenticated: true,
				username: 'cameronape',
				token: 'xxx123123123xxx123123123xxx'
			}
		}>
			<AppRouter></AppRouter>
		</UserContextProvider>
	)
}

export default App
