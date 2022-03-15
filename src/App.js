import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./Main";
import React from "react";

function App() {

    return (
        <React.Fragment>
            <Routes>
                <Route path="/portfolio" element={<Main/>}/>
                <Route path="*" element={<Navigate to="/portfolio"/>}/>
            </Routes>
        </React.Fragment>
    );
}

export default App;
