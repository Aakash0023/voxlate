import { useParams } from "react-router-dom";
import VideoRoom from "../components/VideoRoom";

export default function Meeting() {
  const { meetingId } = useParams();

  return <VideoRoom meetingId={meetingId} />;
}
