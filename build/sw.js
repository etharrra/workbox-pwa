importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;

// Cache page navigations (html) with a Network First strategy
registerRoute(
    ({ request }) => request.mode === "navigate",
    new NetworkFirst({
        cacheName: "pages",
        plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
    })
);

// Cache CSS, JS, and JSON with a Stale While Revalidate strategy
registerRoute(
    /\.(?:css|js|json)$/,
    new StaleWhileRevalidate({
        cacheName: "assets",
        plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
    })
);

// Cache images with a Cache First strategy
registerRoute(
    /\.(?:png|jpg|jpeg|gif)$/,
    new CacheFirst({
        cacheName: "images",
        plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
    })
);

// Use with precache injection
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
