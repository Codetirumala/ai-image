const GEMINI_API_KEY = 'AIzaSyBrsGbVS5-7bTXttyPWeecZVaLML-mns4c';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Generate an image using Google Gemini API
 */
export async function generateImageWithGemini(prompt, onProgress, signal) {
  onProgress?.({ status: 'submitting', message: 'Connecting to Gemini AI...' });

  const model = 'gemini-2.0-flash-preview-image-generation';
  const url = `${GEMINI_API_BASE}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    if (signal?.aborted) throw new Error('Generation cancelled');

    onProgress?.({ status: 'processing', message: attempt === 1 ? 'Gemini is creating your image...' : `Retrying... (attempt ${attempt}/${MAX_RETRIES})` });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt,
            }],
          }],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
          },
        }),
        signal,
      });

      // Handle rate limiting — wait and retry
      if (response.status === 429) {
        if (attempt < MAX_RETRIES) {
          const waitSec = attempt * 15; // 15s, 30s
          onProgress?.({ status: 'queued', message: `Rate limited — waiting ${waitSec}s before retry...` });
          await new Promise(r => setTimeout(r, waitSec * 1000));
          continue;
        }
        throw new Error('API rate limit exceeded. Please wait a minute and try again.');
      }

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Gemini error: ${response.status}`);
      }

      const data = await response.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];

      for (const part of parts) {
        if (part.inlineData) {
          onProgress?.({ status: 'done', message: 'Image ready!' });
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }

      throw new Error('Gemini did not return an image. Try a different prompt.');

    } catch (e) {
      if (signal?.aborted) throw new Error('Generation cancelled');
      if (attempt === MAX_RETRIES) throw e;
      console.log(`Attempt ${attempt} failed:`, e.message);
    }
  }

  throw new Error('Gemini image generation failed after retries');
}

/**
 * Fallback: Generate image using Pollinations.ai
 */
export async function generateImageWithPollinations(prompt, signal) {
  const encodedPrompt = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 100000);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`;

  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const timeout = setTimeout(() => {
      img.onload = null;
      img.onerror = null;
      reject(new Error('Pollinations timeout'));
    }, 30000);

    img.onload = () => {
      clearTimeout(timeout);
      resolve(imageUrl);
    };
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Pollinations failed'));
    };
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        reject(new Error('Cancelled'));
      });
    }
  });
}

/**
 * Generate image with Gemini as primary, Pollinations as fallback
 */
export async function generateImage(prompt, options = {}, onProgress, signal) {
  // Primary: Gemini API (Imagen 3 → Gemini Flash)
  try {
    const url = await generateImageWithGemini(prompt, onProgress, signal);
    return url;
  } catch (e) {
    if (signal?.aborted) throw e;
    console.log('Gemini unavailable, trying Pollinations...', e.message);
  }

  // Fallback: Pollinations
  try {
    onProgress?.({ status: 'submitting', message: 'Trying backup AI...' });
    const url = await generateImageWithPollinations(prompt, signal);
    onProgress?.({ status: 'done', message: 'Image ready!' });
    return url;
  } catch (e) {
    if (signal?.aborted) throw e;
    throw new Error('All image generation services failed. Please try again later.');
  }
}
