export function shortLink(url: string) {
    let link = url.split('/')[2];

    if (link.startsWith('www.')) {
        link = link.slice(4);
    }

    return link;
}
