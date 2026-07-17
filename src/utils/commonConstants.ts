// OpenRouter Defaults
export const OPENROUTER_VALUES = {
    CONVERSATION_DEFAULT_TITLE: "New Chat",
    PREVIOUS_MESSAGE: 20,
    MAX_TOKEN: 2000,
    GENERATE_TITLE_MODAL: "google/gemini-2.5-flash",
    TITLE_MAX_TOKEN: 20,
};

// Routes Excluded from Compression
export const COMPRESSION_EXCLUDED_ROUTES = new Set([
  "/api/chat/stream",
]);
