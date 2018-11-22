if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./servWork.js')
	.then(function() {
		console.log('Registration successful!');
	})
	.catch(function() {
		console.log('Registration failed!');
	});
}
