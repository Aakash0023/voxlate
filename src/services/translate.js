import api from './api.js';

export async function translateText(text, targetLang) {
  const { data } = await api.post('/meeting/translate', { text, targetLang });
  return data.translatedText;
}
