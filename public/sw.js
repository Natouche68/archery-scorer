self.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request)
			.then((response) => {
				// If the response is valid, clone it and store it in the cache.
				if (response && response.status === 200 && response.type === 'basic') {
					const clone = response.clone();
					caches.open('my-cache').then((cache) => cache.put(event.request, clone));
				}
				return response;
			})
			.catch((error) => caches.match(event.request))
	);
});
