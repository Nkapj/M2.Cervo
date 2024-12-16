import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Habits from "./habits";
import TodoList from "./todoList";
import Expenses from "./expenses";
import Sport from "./sport";
import Goals from "./Goals";
import Notes from "./Notes";


function App () {
    return(
        <Router>

            <Routes>
                
                <Route path='/' element= {< Home/>}></Route>
                <Route path='/Habits' element= {< Habits/>}></Route>
                <Route path='/TodoList' element= {< TodoList/>}></Route>
                <Route path='/Expenses' element= {< Expenses/>}></Route>
                <Route path='/Sport' element= {< Sport/>}></Route>
                <Route path='/Goals' element= {< Goals />}></Route>
                <Route path='/Notes' element= {< Notes/>}></Route>

            </Routes>
                
        </Router>
    )    
}
export default App;