/**
 * @since 1.0.0
 */

import { defineConfig } from "vite";

export default defineConfig(async () => ({
	test: {
		environment: "jsdom"
	}
}));
