import '../styles/globals.css';
if (process.env.NODE_ENV === 'development') {
	const MockServer = () => import('../src/mock/worker');
	MockServer();
}
function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
