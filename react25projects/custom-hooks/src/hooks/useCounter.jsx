import { useState } from "react";

function useCounter(initialValue) {
  const [state, setState] = useState(initialValue);

  const increment = () => setState((prev) => prev + 1);
  const decrement = () => setState((prev) => prev - 1);
  const reset = () => setState(initialValue);

  return { state, increment, decrement, reset };
}

export default useCounter;

//{ counter , increment , decrement , reset }
