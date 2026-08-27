/*---------------------------------------------------------------------------------------------
 *  OCN IDE — Default theme configuration
 *  Defines the OCN color palette and theme defaults.
 *  These work alongside the existing VS Code theme system.
 *--------------------------------------------------------------------------------------------*/

import { OCN_COLORS } from '../branding/ocnProduct.js';

/**
 * OCN theme defaults.
 * These define the visual character of the OCN IDE
 * while preserving full compatibility with the existing theme system.
 *
 * Users can still switch themes freely — these are just the defaults.
 */
export const OCN_THEME_DEFAULTS = {
	/** The default color theme ID for new OCN installations */
	defaultDarkTheme: 'Default Dark Modern',

	/** The default light theme ID */
	defaultLightTheme: 'Default Light Modern',

	/** OCN brand colors for use in custom UI elements */
	brand: OCN_COLORS,

	/** CSS custom properties that define the OCN color system */
	cssCustomProperties: {
		'--ocn-brand-primary': OCN_COLORS.primary,
		'--ocn-brand-secondary': OCN_COLORS.secondary,
		'--ocn-brand-accent': OCN_COLORS.accent,
		'--ocn-brand-gradient': `linear-gradient(135deg, ${OCN_COLORS.gradientStart}, ${OCN_COLORS.gradientEnd})`,
	}
} as const;
