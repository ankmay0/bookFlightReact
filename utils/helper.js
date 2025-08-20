export function convertToQueryParams(obj) {
    return Object.entries(obj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
}