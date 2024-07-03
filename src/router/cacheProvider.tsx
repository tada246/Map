import { Cache } from 'swr';

export function localStorageProvider(): Cache<any> {
    let map: Map<string, any>;
    try {
        map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));
    } catch (_) {
        map = new Map();
    }

    window.addEventListener('beforeunload', () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        localStorage.setItem('app-cache', appCache);
    });

    return map;
}
