import { useState } from "react";
import "./App.css";
import Register from "./Components/Auth/Resgister";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-full w-full">
        <div className="">
          {/* <Register /> */}
          Hello jee
        </div>
      </div>
    </>
  );
}
export default App;
