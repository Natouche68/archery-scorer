const PREFIX = 'V1';
const BASE = `${location.protocol}//${location.host}`;
const ASSETS = [
	`${BASE}/`,
	`${BASE}/assets/index-27a10674.css`,
	`${BASE}/assets/index-ff5214a5.js`,
	`${BASE}/manifest.json`,
	`${BASE}/icon-512.png`,
	`${BASE}/icon-192.png`,
	'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
];

self.addEventListener('install', (event) => {
	console.log('Service Worker -- Install');

	self.skipWaiting();
	event.waitUntil(
		(async () => {
			const cache = await caches.open(PREFIX);
			cache.addAll(ASSETS);
		})()
	);
});

self.addEventListener('activate', (event) => {
	console.log('Service Worker -- Activating');
	self.clients.claim();
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();
			await Promise.all(
				keys.map((key) => {
					if (!key.includes(PREFIX)) {
						return caches.delete(key);
					}
				})
			);
		})()
	);
	console.log(`${PREFIX} active`);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				console.debug('Service Worker -- Get data from cache: ' + event.request.url);
				console.log('-----');
				console.log(response);
				console.log('-----');
				return response;
			}
			return fetch(event.request).then((fetchResponse) => {
				caches.open(PREFIX).then(async (cache) => {
					console.debug('Service Worker -- Fetch and caching new resource: ' + event.request.url);

					cache.put(event.request, fetchResponse.clone());

					return fetchResponse;
				});
			});
		})
	);
});
