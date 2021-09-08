import React from "react";

import createCtx from '../helpers/createCtx'

type ContextProps = {
	authenticated: boolean,
	username: string,
	token: string
}

const UserContext = React.createContext<Partial<ContextProps>>({})

export const UserContextProvider = UserContext.Provider
export const UserContextConsumer = UserContext.Consumer

export default UserContext