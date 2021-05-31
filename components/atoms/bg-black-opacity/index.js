export default function BgBlackOpacity({ isActive }) {
  return isActive
    ? <div style={{
      backgroundColor: "rgba(0, 0, 0, 0.87)",
      opacity: 0.3,
      position: "fixed",
      width: "100vw",
      height: "100vh",
      left: 0,
      top: 0,
      zIndex: 0,
    }} ></div>
    : null;
}