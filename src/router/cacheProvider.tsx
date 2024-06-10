import { Cache } from 'swr';

export function localStorageProvider(): Cache<any> {
    const map: Map<string, any> = new Map(
        JSON.parse(localStorage.getItem('app-cache') || '[]')
    );

    window.addEventListener('beforeunload', () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        localStorage.setItem('app-cache', appCache);
    });

    return map;
}
