/*---------------------------------------------------------------------------------------------
 *  OCN IDE — Product branding constants
 *  This module centralizes OCN-specific branding strings and configuration.
 *  Other OCN modules should import from here rather than hardcoding values.
 *--------------------------------------------------------------------------------------------*/

/**
 * OCN product identity constants.
 * These are used by OCN-specific UI components and branding layers.
 * The canonical product configuration still flows through product.json → IProductService.
 */
export const OCN_PRODUCT_NAME = 'OCN';
export const OCN_PRODUCT_NAME_LONG = 'OCN';
export const OCN_PRODUCT_DESCRIPTION = 'A modern developer IDE';
export const OCN_PRODUCT_SUBTITLE = 'A modern developer IDE';

/**
 * OCN color palette — used for branded UI elements.
 * These complement the existing VS Code theme system rather than replacing it.
 */
export const OCN_COLORS = {
	/** Primary brand color — deep electric blue */
	primary: '#2D5AF0',
	/** Secondary brand color — vibrant cyan accent */
	secondary: '#00D4FF',
	/** Tertiary accent — subtle violet for highlights */
	accent: '#7C4DFF',
	/** Gradient start for branded elements */
	gradientStart: '#2D5AF0',
	/** Gradient end for branded elements */
	gradientEnd: '#00D4FF',
} as const;

/**
 * OCN icon identifiers
 */
export const OCN_ICON_ID = 'ocn-icon';
