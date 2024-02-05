import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';

export default function App() {
    return (
        <section className='App'>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                </Routes>
            </Router>
        </section>
    );
}
