import { useState } from "react";

function App() {
  const [bgColor, setBgColor] = useState("#123456");

  const randomColorGeneratorHex = () => {
    const colorString = "abcdef1234567890";
    let theColor = "";
    for (let i = 1; i <= 6; i++) {
      let flag = true;
      while (flag) {
        let randomValue = parseInt(Math.random() * 10);
        if (randomValue < 16 && i < 7) {
          theColor += colorString[randomValue];
          flag = false;
        } else {
          flag = true;
        }
      }
    }
    return "#" + theColor;
  };

  const randomColorGeneratorRGB = () => {
    let theColor = [];
    for (let i = 1; i <= 3; i++) {
      let randomValue = parseInt(Math.random() * 100);
      theColor.push(randomValue);
    }
    return `rgb(${theColor[0]},${theColor[1]},${theColor[2]})`;
  };

  const btnHandlerHex = () => {
    setBgColor(randomColorGeneratorHex());
  };

  const btnHandlerRGB = () => {
    setBgColor(randomColorGeneratorRGB());
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`h-screen w-full text-white flex flex-col gap-10 justify-center items-center`}
    >
      <div className="flex gap-10">
        <button onClick={btnHandlerHex} className="bg-black px-6 py-3 rounded-2xl">
          GenerateHex Color
        </button>
        <button onClick={btnHandlerRGB} className="bg-black px-6 py-3 rounded-2xl">
          GenerateRGB Color
        </button>
        
      </div>

      <div className="flex gap-10">
      <div className="bg-white px-4 py-4 text-black rounded-md flex justify-center items-center">
          Current Colour : {bgColor}
        </div>
      </div>
    </div>
  );
}

export default App;
