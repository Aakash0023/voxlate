import { Languages, Sparkles } from "lucide-react";
import "../styles/liveTranslationCard.css";

export default function LiveTranslationCard({ language, translation }) {
  return (
    <div className="translation-card">
      <div className="translation-top">
        <div className="translation-icon">
          <Languages size={22} />
        </div>

        <div className="translation-heading">
          <h3>Live Translation</h3>
          <span>{language}</span>
        </div>

        <div className="ai-badge">
          <Sparkles size={14} />
          AI
        </div>
      </div>

      <div className="translation-body">
        {translation ? (
          <p>{translation}</p>
        ) : (
          <div className="translation-loading">
            <span></span>
            <span></span>
            <span></span>

            <p>Listening and translating...</p>
          </div>
        )}
      </div>
    </div>
  );
}
