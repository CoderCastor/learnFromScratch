import { useState } from "react";

const useToggle = (initialValue = false) => {

    const [ state , setToggle ] = useState(initialValue)
    
    const toggle = () => {
        setToggle(prev => !prev)
    }

    return [ state , toggle ]

}

export default useToggle;