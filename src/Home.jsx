import { Link } from "react-router-dom";
import "./App.css";


function Home () {





return (

    <div className="container">
    <div className="box"><Link to='/'>Home</Link></div>
    <div className="box"><Link to='/Habits'>Habits</Link></div>
    <div className="box"><Link to='/TodoList'>TodoList</Link></div>
    <div className="box"><Link to='/Expenses'>Expenses</Link></div>
    <div className="box"><Link to='/Sport'>Sport</Link></div>
    <div className="box"><Link to='/Goals'>Goals</Link></div>
    <div className="box"><Link to='/Notes'>Notes</Link></div>
    </div>
    
)
}



export default Home;
