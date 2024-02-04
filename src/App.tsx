import { Route, Routes } from 'react-router-dom';
import { Form, Home, Information, Map, NotFound } from './pages';
import AboutRoot from './components/layout/AboutRoot';
import AppRoot from './components/layout/AppRoot';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<AboutRoot children={<Home />} />} />
            <Route
                path='/app/:id'
                element={<AppRoot children={<Map />} isWithoutPadding />}
            />
            <Route
                path='/app/:id/form'
                element={<AppRoot children={<Form />} />}
            />
            <Route
                path='/app/:id/info'
                element={<AppRoot children={<Information />} />}
            />
            <Route path='*' element={<AboutRoot children={<NotFound />} />} />
        </Routes>
    );
}
