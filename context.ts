import React from "react";

export type functionContext = {
    signIn: Function
    signUp: Function
    saveUserUpdate: Function,
    logOut: Function
}

export const Context = React.createContext<functionContext | null>(null)