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
    HomePage,
    QRCodePage,
    MessagePage,
    SettingsPage,
    ComingEntertainmentsPage,
    OpenEntertainmentsPage,
    UnexpectedErrorPage,
} from './pages';
import ErrorBoundary from './components/atom/ErrorBoundary';

export default function App() {
    return (
        <ErrorBoundary fallback={<UnexpectedErrorPage />}>
            <Routes>
                <Route path='/' element={<TopPage />} />
                <Route path='/events' element={<EventsPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/privacy' element={<PrivacyPage />} />
                <Route path='/events/:eventId' element={<HomePage />} />
                <Route path='/events/:eventId/map' element={<MapPage />} />
                <Route
                    path='/events/:eventId/detail'
                    element={<DetailPage />}
                />
                <Route path='/events/:eventId/form' element={<FormsPage />} />
                <Route
                    path='/events/:eventId/list'
                    element={<EntertainmentPage />}
                />
                <Route
                    path='/events/:eventId/list/coming'
                    element={<ComingEntertainmentsPage />}
                />
                <Route
                    path='/events/:eventId/list/open'
                    element={<OpenEntertainmentsPage />}
                />
                <Route
                    path='/events/:eventId/qrcode'
                    element={<QRCodePage />}
                />
                <Route
                    path='/events/:eventId/messages'
                    element={<MessagePage />}
                />
                <Route
                    path='/events/:eventId/settings'
                    element={<SettingsPage />}
                />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </ErrorBoundary>
    );
}
