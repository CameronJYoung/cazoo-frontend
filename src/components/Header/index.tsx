import React from 'react'

import styles from './Header.module.scss'

interface IHeaderProps {
	username: string
} 

function Header({username}: IHeaderProps) {
	return (
		<header className={styles.Header}>
			<h1>CAZOO</h1>
		</header>
	)
}

export default Header
