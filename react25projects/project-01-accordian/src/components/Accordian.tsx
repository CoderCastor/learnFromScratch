import React, { useState } from "react";

function Accordian({item}) {

    const [open , setOpen] = useState(false)

    const btnClickHandler = () =>{
        setOpen(prev => !prev)
    }

  return (
    <div className=" p-2 flex flex-col w-[60vh]">
      <div className="flex justify-between items-center px-8 text-xl">
        <h4>{item.question}</h4>
        <button onClick={btnClickHandler} className="h-6 w-6 rounded-full hover:border-[1px] hover:border-gray-400 text-white font-semibold text-xl flex justify-center items-center">
          {open ? "-" : "+"}
        </button>
      </div>
      <div className={`text-zinc-400 px-8 mt-2 max-h-0 overflow-hidden transition-all duration-500 ease-in-out opacity-0 ${open ? "max-h-screen opacity-100" : ""}`}>
        {/* {`mt-2 overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0 ${
          open ? "max-h-screen opacity-100" : ""
          }`} */}
          <hr className="mb-2" />
        {item.answer}
      </div>
      <hr className={`${item.id == 5 ? "hidden":""} border-zinc-800 mt-4`}  />
    </div>
  );
}

export default Accordian;


/**
 * import React, { useState } from "react";

function Accordion({ item }) {
  const [open, setOpen] = useState(false);

  const btnClickHandler = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="border-white border-2 p-2 flex flex-col w-[60vh] transition-all duration-600 ease-in-out">
      <div className="flex justify-between items-center px-8 ">
        <h4>{item.question}</h4>
        <button
          onClick={btnClickHandler}
          className="h-8 w-8 rounded-full bg-white text-black font-semibold text-3xl flex justify-center items-center"
        >
          {open ? "-" : "+"}
        </button>
      </div>

      <div
        className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0 ${
          open ? "max-h-screen opacity-100" : ""
        }`}
      >
        <hr className="mb-2" />
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default Accordion;

 */
