import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './router/Layout.tsx';
import { SWRConfig } from 'swr';
import { localStorageProvider } from './router/cacheProvider.tsx';
import AnalyticsProvider from './router/AnalyticsProvider..tsx';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AnalyticsProvider>
            <CookiesProvider>
                <SWRConfig value={{ provider: localStorageProvider }}>
                    <Layout>
                        <App />
                    </Layout>
                </SWRConfig>
            </CookiesProvider>
        </AnalyticsProvider>
    </BrowserRouter>
);
