import { useSession } from '@shared/hooks/useSession';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireAuth() {
	const getAccessToken = useSession(s => s.getAccessToken);
	const location = useLocation();

	if (!getAccessToken()) {
		// redirect to /signin, keeping track of where we came from
		return <Navigate to='/signin' state={{ from: location }} replace />;
	}

	// if we have a token—render nested routes
	return <Outlet />;
}
