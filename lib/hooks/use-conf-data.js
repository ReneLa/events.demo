import {createContext, useContext} from 'react'

export const PageState = 'registration' | 'ticket'

export const UserData ={
    id:'',
    ticketNumber:'',
    username:'',
    name:''
}

export const ConfDataContext = createContext(null)

export default function useConfData(){
    const result = useContext(ConfDataContext)
    if(!result){
        throw new Error();
    }
    return result;
}