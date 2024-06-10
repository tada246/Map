import { Route, Routes } from 'react-router-dom';
import {
    MapPage,
    EventsPage,
    NotFound,
    TopPage,
    FormsPage,
    DetailPage,
    AboutPage,
    PrivacyPage,
    EntertainmentPage,
} from './pages';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<TopPage />} />
            <Route path='/events' element={<EventsPage />} />
            <Route path='/events/:eventId' element={<MapPage />} />
            <Route path='/events/:eventId/detail' element={<DetailPage />} />
            <Route path='/events/:eventId/form' element={<FormsPage />} />
            <Route
                path='/events/:eventId/list'
                element={<EntertainmentPage />}
            />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}
