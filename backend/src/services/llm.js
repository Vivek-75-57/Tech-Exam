/**
 * LLM Service - Now uses Groq API
 * This module maintains backward compatibility by re-exporting groqService
 * All Anthropic code has been migrated to groqService.js
 */

import { groqService } from "./groqService.js";

// Export groqService as llmService for backward compatibility
export const llmService = groqService;

