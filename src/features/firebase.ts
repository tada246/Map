import { initializeApp } from 'firebase/app';
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

export const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig, {});
const db = getFirestore(app);

const useEmulators =
    import.meta.env.VITE_USE_EMULATORS?.toLowerCase() === 'true';
const isDev = import.meta.env.DEV;

if (useEmulators) {
    connectFirestoreEmulator(db, 'localhost', 8080);
}

if (isDev && !useEmulators) {
    window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

if (!useEmulators) {
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(
            import.meta.env.VITE_RECAPTCHA_SITE_KEY
        ),
        isTokenAutoRefreshEnabled: true,
    });
    getAnalytics(app);
}

export { db };
