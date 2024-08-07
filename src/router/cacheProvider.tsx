import { Cache } from 'swr';

export function localStorageProvider(): Cache<any> {
    let map: Map<string, any>;
    try {
        const cache_value = localStorage.getItem('app-cache') || '[]';
        map = new Map(JSON.parse(cache_value));
    } catch (_) {
        map = new Map(JSON.parse('[]'));
    }

    window.addEventListener('beforeunload', () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        localStorage.setItem('app-cache', appCache);
    });

    return map;
}
