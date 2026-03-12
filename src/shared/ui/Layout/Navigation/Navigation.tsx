import { Link } from "react-router-dom";
import { Button } from "../../Button/Button";
import styles from "./Navigation.module.css";

export function Navigation() {
	return (
		<nav className={styles.root}>
			<ul className={styles.list}>
				<li>
					<Button asChild variant="ghost">
						<Link to="/">Home</Link>
					</Button>
				</li>
				<li>
					<Button asChild variant="ghost">
						<Link to="/#about">About</Link>
					</Button>
				</li>
			</ul>
		</nav>
	);
}
