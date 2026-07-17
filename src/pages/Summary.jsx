import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FileText, CheckCircle2, Sparkles, Mic } from "lucide-react";
import api from "../services/api.js";

function Summary() {
  const { roomId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data: result } = await api.get(`/meeting/${roomId}/summary`);
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }

    load();
    // Poll in case the meeting is still being analyzed shortly after ending.
    const interval = setInterval(load, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [roomId]);

  return (
    <div className="min-h-screen bg-[#030712] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-400 mb-2">Meeting ID • {roomId}</p>
        <h1 className="text-4xl font-black mb-10">Meeting Summary</h1>

        {error && (
          <p className="text-red-400 mb-6">
            Couldn't reach the Voxlate server ({error}). Make sure it's
            running (`npm run server`).
          </p>
        )}

        <section className="rounded-3xl bg-[#111827] border border-white/10 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-orange-400" />
            <h2 className="text-xl font-semibold">Summary</h2>
          </div>
          <p className="text-gray-300">
            {data?.summary || "Summary will appear here once the meeting ends."}
          </p>
        </section>

        <section className="rounded-3xl bg-[#111827] border border-white/10 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-green-400" />
            <h2 className="text-xl font-semibold">Decisions</h2>
          </div>
          {data?.decisions?.length ? (
            <ul className="space-y-3">
              {data.decisions.map((d) => (
                <li key={d.id} className="rounded-xl bg-[#1F2937] p-4">
                  <p className="text-gray-200">{d.text}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Confidence: {Math.round((d.confidence || 0) * 100)}%
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No decisions detected.</p>
          )}
        </section>

        <section className="rounded-3xl bg-[#111827] border border-white/10 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="text-emerald-400" />
            <h2 className="text-xl font-semibold">Action Items</h2>
          </div>
          {data?.actionItems?.length ? (
            <ul className="space-y-3">
              {data.actionItems.map((a) => (
                <li key={a.id} className="rounded-xl bg-[#1F2937] p-4">
                  <p className="text-gray-200">{a.description}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Owner: {a.owner || "Unassigned"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No action items detected.</p>
          )}
        </section>

        <section className="rounded-3xl bg-[#111827] border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mic className="text-cyan-400" />
            <h2 className="text-xl font-semibold">Full Transcript</h2>
          </div>
          {data?.transcript?.length ? (
            <ul className="space-y-4">
              {data.transcript.map((t) => (
                <li key={t.id}>
                  <p className="text-violet-400 font-semibold">{t.speaker}</p>
                  <p className="text-gray-300">{t.original}</p>
                  {t.translated && (
                    <p className="text-gray-500 text-sm">{t.translated}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No transcript recorded.</p>
          )}
        </section>

        <Link to="/" className="inline-block mt-10 text-violet-400 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

export default Summary;
