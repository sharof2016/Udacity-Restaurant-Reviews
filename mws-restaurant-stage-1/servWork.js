var staticCacheName = 'restaurant-cache1';

let urlToCache = [
	'/',
	'./restaurant.html',
	'./css/styles.css',
	'./data/restaurants.json',
	'./js/register-sw.js',
	'./js/mapbox.js',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/3.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg',
	'./js/main.js',
	'./js/restaurant_info.js',
	'./js/dbhelper.js',
	// './servWork.js',

];
self.addEventListener('install', function (event) {

	event.waitUntil(
		caches.open(staticCacheName).then(function (cache) {
			console.log(cache);
			return cache.addAll(urlToCache);

		}).catch(error => {
			console.log(error);
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					return cacheName.startsWith('restaurant-') &&
					cacheName != staticCacheName;
				}).map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', function (event) {
	const requestUrl = new URL(event.request.url);

  // highjack only requests made to our app (not mapbox maps or leaflet, for example)
  if (requestUrl.origin === location.origin) {

    // Since requests made to restaurant.html have search params (like ?id=1), the url can't be used as the
    // key to access the cache, so just respondWith restaurant.html if pathname startsWith '/restaurant.html'
    if (requestUrl.pathname.startsWith('/restaurant.html')) {
      event.respondWith(caches.match('/restaurant.html'));
      return; // Done handling request, exit early.
    }
  }
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
