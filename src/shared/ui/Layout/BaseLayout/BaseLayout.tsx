import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./BaseLayout.module.css";

export function BaseLayout() {
	return (
		<div className={styles.container}>
			<Header />
			<main className={styles.mainWrapper}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
