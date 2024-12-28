import Accordians from "./components/Accordians";

const data = [
  {
    "id": 1,
    "question": "What is the capital of France?",
    "answer": "Paris is the capital of France and one of the world’s most famous cities, known for its art, history, architecture, and landmarks like the Eiffel Tower, Louvre Museum, and the Seine River."
  },
  {
    "id": 2,
    "question": "Who wrote 'To Kill a Mockingbird'?",
    "answer": "Harper Lee, an American novelist, wrote 'To Kill a Mockingbird' in 1960. The novel explores serious themes such as racial injustice, moral growth, and the loss of innocence in a small Southern town."
  },
  {
    "id": 3,
    "question": "What is the largest planet in our solar system?",
    "answer": "Jupiter is the largest planet in our solar system, with a diameter of 88,846 miles. It is known for its Great Red Spot, many moons, and intense storms that are visible from Earth."
  },
  {
    "id": 4,
    "question": "What year did the Titanic sink?",
    "answer": "The Titanic sank on April 15, 1912, after hitting an iceberg in the North Atlantic Ocean. The disaster led to the deaths of over 1,500 people, shocking the world and inspiring countless stories."
  },
  {
    "id": 5,
    "question": "Which element has the chemical symbol 'O'?",
    "answer": "Oxygen, represented by the symbol 'O,' is a vital chemical element for life. It is a colorless, odorless gas that makes up about 21% of Earth’s atmosphere and is necessary for cellular respiration."
  }
]


function App() {
  return (
  
      <main className="bg-black h-screen w-full text-white flex justify-center items-center px-8">

        <Accordians info={data} />
      </main>
    
  );
}

export default App;
