import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoomId } from "../utils/helpers.js";

/**
 * Landing spot for bare "/dashboard" or "/meeting" links (no room id yet).
 * Generates a fresh room id and redirects into the real, shareable URL.
 */
function NewMeetingRedirect({ base }) {
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;
    hasRedirected.current = true;
    navigate(`${base}/${generateRoomId()}`, { replace: true });
  }, [base, navigate]);

  return null;
}

export default NewMeetingRedirect;
