import { setPreferredLanguage, setPreferredTheme } from './preferences.js';
import { generateContent } from './generateContent.js';

let connectButton = document.querySelector('#connect');

// ============================================================================
// ============================================================================
// =============================== Load content ===============================
// ============================================================================
// ============================================================================
// Load on mount
setPreferredLanguage();
setPreferredTheme();
generateContent();
