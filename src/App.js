import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./Main";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
  );
}

export default App;
