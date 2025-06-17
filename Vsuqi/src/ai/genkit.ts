import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {ollama} from 'genkitx-ollama'; // Corrected import

// Define a common open model to be used with Ollama.
// The user will need to ensure this model is available in their Ollama instance.
// For example, by running `ollama pull llama3`
const OLLAMA_MODEL_NAME = 'llama3';

export const ai = genkit({
  plugins: [
    googleAI(), // Retained for specific Google AI model calls (e.g., image generation as per guidelines)
    ollama()    // Add Ollama plugin with default settings (connects to http://localhost:11434 by default)
  ],
  // Set the default model for the `ai` instance to an Ollama-served model.
  // Flows that don't specify a model (like the existing ones for contact and product inquiry) will use this.
  model: `ollama/${OLLAMA_MODEL_NAME}`,
});
