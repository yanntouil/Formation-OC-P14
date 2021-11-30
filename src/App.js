import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'//HashRouter
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home';
import ShowEmployees from './Pages/ShowEmployees';


function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" exact element={<Home />}/>
                    <Route path="/show-employees" exact element={<ShowEmployees />}/>
                    <Route path="*" element={<Navigate to={'/'} />}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
