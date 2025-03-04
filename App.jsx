import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [Password, SetPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhhgfdsazxcvbnm";
    if (NumberAllowed) {
      str += "0123456789";
    }
    if (CharAllowed) {
      str += "!@#$%^&*(){}[]?";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      SetPassword(pass);
    }
  }, [length, NumberAllowed, CharAllowed, SetPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, NumberAllowed, CharAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto text-xl shadow-md rounded-lg px-4 my-8 text-gray-900 bg-gray-400 ">
        <h4 className="mb-3 pt-2 ">PasswordGenerator</h4>
        <div className="flex shadow-lg rounded-lg overflow-hidden h-10 text-orange-700 mb-4">
          <input
            type="text"
            value={Password}
            placeholder="password"
            readOnly
            ref={passwordRef}
            className="outline-none w-full py-1 px-3 bg-gray-800 h-10"
          />
          <button
            className="text-center outline-none w-20 h-10 bg-blue-700 hover:cursor-pointer hover:bg-blue-800 text-white shrink-0 rounded-md"
            onClick={copyToClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 pb-5">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={8}
              max={16}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label> Length : {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={NumberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />{" "}
            <label> Numbers </label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={CharAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />{" "}
            <label> Characters </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
