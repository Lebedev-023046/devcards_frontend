import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const SignInPage = lazy(() => import('@/pages/SignInPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const DecksPage = lazy(() => import('@/pages/DecksPage'));
const DeckPage = lazy(() => import('@/pages/DeckPage'));
const CardsPage = lazy(() => import('@/pages/CardsPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));

const RequireAuth = lazy(() => import('@/features/auth/components/RequireAuth'));

export function AppRouter() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					{/* public */}
					<Route path='/' element={<LandingPage />} />
					<Route path='/signin' element={<SignInPage />} />
					<Route path='/signup' element={<SignUpPage />} />

					{/* private */}
					<Route element={<RequireAuth />}>
						<Route path='/decks' element={<DecksPage />} />
						<Route path='/decks/:deckId' element={<DeckPage />} />
						<Route path='/decks/:deckId/cards' element={<CardsPage />} />
						<Route path='/profile' element={<ProfilePage />} />
					</Route>

					{/* not found */}
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
