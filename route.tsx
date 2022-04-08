import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App';

export default function AppComponent() {
    return (<BrowserRouter>
        <Routes>
            <Route path="/home" element={<App />}></Route>
        </Routes>
    </BrowserRouter>)
}
