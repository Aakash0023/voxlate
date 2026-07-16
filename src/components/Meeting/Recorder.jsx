import { ReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

const Recorder = () => {
  const uploadAudio = async (blobUrl) => {
    const blob = await fetch(blobUrl).then((r) => r.blob());

    const formData = new FormData();
    formData.append("audio", blob, "meeting.webm");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ReactMediaRecorder
      audio
      render={({ startRecording, stopRecording, mediaBlobUrl }) => (
        <div className="flex gap-4">
          <button
            onClick={startRecording}
            className="bg-green-600 px-6 py-3 rounded-xl"
          >
            Start Recording
          </button>

          <button
            onClick={() => {
              stopRecording();

              setTimeout(() => {
                if (mediaBlobUrl) uploadAudio(mediaBlobUrl);
              }, 1000);
            }}
            className="bg-red-600 px-6 py-3 rounded-xl"
          >
            Stop Recording
          </button>
        </div>
      )}
    />
  );
};

export default Recorder;
