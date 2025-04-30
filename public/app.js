// Theme toggle functionality with localStorage persistence
document.addEventListener('DOMContentLoaded', () => {
	// Apply the saved theme on page load
	applyTheme();

	// Update the toggle button state based on current theme
	updateToggleButton();
});

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
	// Check current theme
	const isDarkMode = document.documentElement.classList.contains('dark');

	// Toggle to the opposite theme
	if (isDarkMode) {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('theme', 'light');
	} else {
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	}

	// Update button aria-pressed state
	updateToggleButton();
}
// Make toggleTheme available globally
window.toggleTheme = toggleTheme;

/**
 * Apply the saved theme from localStorage or system preference
 */
function applyTheme() {
	// Check if there's a saved preference in localStorage
	const savedTheme = localStorage.getItem('theme');

	if (savedTheme === 'dark') {
		// Apply dark theme if explicitly set
		document.documentElement.classList.add('dark');
	} else if (savedTheme === 'light') {
		// Apply light theme if explicitly set
		document.documentElement.classList.remove('dark');
	} else {
		// If no saved preference, use system preference
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		}
	}
}

/**
 * Update the toggle button's aria-pressed attribute based on current theme
 */
function updateToggleButton() {
	const isDarkMode = document.documentElement.classList.contains('dark');
	const toggleButton = document.querySelector('.theme-toggle');

	if (toggleButton) {
		toggleButton.setAttribute('aria-pressed', isDarkMode.toString());
	}
}

// Listen for system theme changes if no manual preference is set
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
	if (!localStorage.getItem('theme')) {
		if (e.matches) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		updateToggleButton();
	}
});
