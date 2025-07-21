import { Button } from '../../Button';
import styles from './Navigation.module.css';

export function Navigation() {
	return (
		<nav className={styles.root}>
			<ul className={styles.list}>
				<li>
					<Button as='a' href='/' variant='link'>
						Home
					</Button>
				</li>
				<li>
					<Button as='a' href='#about' variant='link'>
						About
					</Button>
				</li>
			</ul>
		</nav>
	);
}
