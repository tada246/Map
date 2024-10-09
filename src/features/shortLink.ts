export function shortLink(url: string) {
    try {
        let link = url.split('/')[2];

        if (link?.startsWith('www.')) {
            link = link.slice(4);
        }

        return link;
    } catch (error) {
        console.error(error);
        return url;
    }
}
