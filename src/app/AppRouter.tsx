import { useTheme } from '@/shared/styles/useTheme';
import { AuthLayout } from '@/shared/ui/Layout/AuthLayout';
import { BaseLayout } from '@/shared/ui/Layout/BaseLayout';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const SignInPage = lazy(() => import('@/pages/SignInPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const DecksPage = lazy(() => import('@/pages/DecksPage'));
const DeckPage = lazy(() => import('@/pages/DeckPage'));
const CardsPage = lazy(() => import('@/pages/CardsPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));

const RequireAuth = lazy(
	() => import('@/features/auth/components/RequireAuth'),
);

export function AppRouter() {
	const { theme } = useTheme();

	return (
		<>
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				pauseOnHover
				theme={theme}
			/>
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route element={<AuthLayout />}>
							<Route path='/signin' element={<SignInPage />} />
							<Route path='/signup' element={<SignUpPage />} />
						</Route>

						<Route element={<BaseLayout />}>
							<Route path='/' element={<LandingPage />} />
							<Route element={<RequireAuth />}>
								<Route path='/decks' element={<DecksPage />} />
								<Route path='/decks/:deckId' element={<DeckPage />} />
								<Route path='/decks/:deckId/cards' element={<CardsPage />} />
								<Route path='/profile' element={<ProfilePage />} />
							</Route>
						</Route>

						{/* not found */}
						<Route path='*' element={<Navigate to='/' replace />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</>
	);
}
