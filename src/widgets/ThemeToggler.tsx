import { useTheme } from "@/shared/styles/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

	const onClick = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

  return (
    <button onClick={onClick}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}