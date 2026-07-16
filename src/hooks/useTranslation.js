import { useState, useCallback } from 'react';
import { translateText } from '../services/translate.js';

export function useTranslation(targetLang) {
  const [isTranslating, setIsTranslating] = useState(false);

  const translate = useCallback(
    async (text) => {
      setIsTranslating(true);
      try {
        return await translateText(text, targetLang);
      } finally {
        setIsTranslating(false);
      }
    },
    [targetLang]
  );

  return { translate, isTranslating };
}
