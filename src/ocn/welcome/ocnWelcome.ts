/*---------------------------------------------------------------------------------------------
 *  OCN IDE — Welcome page customization
 *  This module provides OCN-specific welcome experience overrides.
 *  It works with the existing Code-OSS welcome/getting-started infrastructure.
 *--------------------------------------------------------------------------------------------*/

import { OCN_PRODUCT_NAME, OCN_PRODUCT_SUBTITLE } from '../branding/ocnProduct.js';

/**
 * OCN welcome page configuration.
 * These values are used to customize the welcome experience
 * while preserving the underlying Code-OSS getting-started architecture.
 */
export const OCN_WELCOME_CONFIG = {
	/** Product name displayed in the welcome header */
	productName: OCN_PRODUCT_NAME,

	/** Subtitle shown below the product name on the welcome page */
	subtitle: OCN_PRODUCT_SUBTITLE,

	/** CSS class applied to the welcome container for OCN-specific styling */
	containerClass: 'ocn-welcome',

	/** Welcome page sections configuration */
	sections: {
		/** Show the "Start" section (New File, Open Folder, etc.) */
		showStart: true,
		/** Show the "Recent" section */
		showRecent: true,
		/** Show walkthroughs */
		showWalkthroughs: true,
		/** Show "Show on startup" checkbox */
		showStartupCheckbox: true,
	}
} as const;
