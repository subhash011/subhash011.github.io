import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./Main";
import React from "react";
import {ThemeContext} from "./Context";


function App() {

    const [theme, setTheme] = React.useState(localStorage.getItem('theme'));

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </ThemeContext.Provider>
    );
}

export default App;
