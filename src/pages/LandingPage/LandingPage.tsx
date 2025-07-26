import { Hero } from './components/Hero';

function LandingPage() {
	return (
		<div
			className='landing-page'
			style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
			}}
		>
			<Hero />
		</div>
	);
}

export default LandingPage;
