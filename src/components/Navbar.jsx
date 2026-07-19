import "../styles/navbar.css";

export default function Navbar({ onCreateMeeting }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>VOXLATE</h2>
      </div>

      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#about">About</a>
      </div>

      <button className="nav-btn" onClick={onCreateMeeting}>
        Start Meeting
      </button>
    </nav>
  );
}
