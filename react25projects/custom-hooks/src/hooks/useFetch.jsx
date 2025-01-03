import { useEffect, useState } from "react"

const useFetch = (url) => {

    const [data,setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(()=>{
        fetch(url).then((response)=>{
            try{
                if(response.status == 200){
                    return response.json()
                }else{
                    throw new Error(`Failed to fetch data. ${response.status}`)
                }
                
            }catch(error){
                console.log(error)
                setError(error)
            }
        }).then((result)=>{
            setData(result);
            
        }).catch((err)=>{
            setError(err)
        }).finally(()=>{
            setLoading(false);
        })
    },[url])

    return { data,loading,error }
    

}

export default useFetch