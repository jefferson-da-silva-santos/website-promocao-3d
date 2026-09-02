export const c = {
  ink: "#16130F",
  paper: "#FFFCF4",
  white: "#FFFFFF",
  red: "#D1141B",
  yellow: "#F2B705",
  green: "#7CC63F",
  text: "#3B352C",
  muted: "#6B6355",
  faint: "#A39B8C",
  dash: "#E3DCCB",
  cream: "#FFF6D6",
  inkSoft: "#241E17",
  inkText: "#E8E2D6",
} as const;

export const display = "'Josefin Sans', 'Muli', sans-serif";

export const section: React.CSSProperties = {
  position: "relative",
  background: c.paper,
  borderBottom: `3px solid ${c.ink}`,
  padding: "84px 24px",
};

export const dots: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: `radial-gradient(${c.ink} 1px, transparent 1px)`,
  backgroundSize: "26px 26px",
  opacity: 0.05,
  pointerEvents: "none",
};

export const inner: React.CSSProperties = {
  position: "relative",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: 48,
};

export const frame = (accent: string): React.CSSProperties => ({
  border: `3px solid ${c.ink}`,
  borderRadius: 18,
  boxShadow: `9px 9px 0 ${accent}`,
  overflow: "hidden",
  background: c.white,
});

export const pillBtn = (bg: string, fg: string): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 9,
  background: bg,
  color: fg,
  fontSize: 15,
  fontWeight: 700,
  padding: "13px 24px",
  border: `2px solid ${c.ink}`,
  borderRadius: 999,
  boxShadow: `4px 4px 0 ${c.ink}`,
  textDecoration: "none",
  cursor: "pointer",
});
