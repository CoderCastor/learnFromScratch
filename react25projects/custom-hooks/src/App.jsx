// import useCounter from "./hooks/useCounter"

//for useCounter hook
// function App() {
//   const { state , increment , decrement , reset } = useCounter(0)
//   console.log(state);
//   return (
//     <>
//      <h1>{state}</h1>
//      <button onClick={increment} >increment</button>
//      <button onClick={decrement}>decrement</button>
//      <button onClick={reset}>reset</button>
//     </>
//   )
// }

//useToggle
// import useToggle from "./hooks/useToggle";
// function App() {
//   const [isVisible, changeToggleSta] = useToggle();

//   return (
//     <>
//       <h2>isVisible : {isVisible.toString()}</h2>
//       <button onClick={changeToggleSta}>
//         Click to {(!isVisible).toString()}
//       </button>
//     </>
//   );
// }



//useFetch
import useFetch from "./hooks/useFetch";
const App = () => {
  const { data, error, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"

  );

  console.log("Data : ", data);
  console.log("Error : ", error);
  console.log("Loading : ", loading);

  if(error){
    return <h1>Error : {error.message || "Something went wrong"}</h1>
  }

  return (
    <div className="box bg-zinc-900 h-screen w-full flex justify-center items-center">
      <div className="DataBoxes bg-zinc-950 w-[90%] h-[90%]">
        {loading ? (
          <h2 className="h-full w-full flex justify-center items-center text-white text-3xl">
            Loading...
          </h2>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-y-scroll h-full gap-5 p-5">
            {data && data.map((item,key)=>{
              return <div key={key} className="text-white bg-zinc-950 text-wrap border-zinc-500 border-2 px-5 py-2 rounded-lg">
                <h3 className="text-3xl" >{item.title}</h3>
                <hr className="my-3 border-zinc-600" />
                <p className="text-zinc-400 text-justify">{item.body}</p>
              </div>
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
