export default function BgColorOpacity({ isActive, color = "rgba(0, 0, 0, 0.87)", opacity = 0.3 }) {
  return isActive
    ? <div style={{
      backgroundColor: color,
      opacity: opacity,
      position: "fixed",
      width: "100vw",
      height: "100vh",
      left: 0,
      top: 0,
      zIndex: 1,
    }} ></div>
    : null;
}