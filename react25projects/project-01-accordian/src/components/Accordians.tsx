import React from 'react'
import Accordian from './Accordian'

function Accordians({info}) {
  return (
    <div className='border-gray-800 border-2 p-2 flex flex-col gap-2'>
        {info.map((item)=>{
            return <Accordian key={item.id} item={item} />
        })}
    </div>
  )
}

export default Accordians