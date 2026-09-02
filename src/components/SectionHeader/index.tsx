import React from "react";
import logo from "../../assets/image/logo.png";
import { c, display } from "../../theme";

interface Props {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeader: React.FC<Props> = ({ label, title, subtitle, align = "left" }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align === "center" ? "center" : "left",
    }}
  >
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: c.ink, padding: "6px 14px 6px 7px", borderRadius: 999 }}>
      <img src={logo} alt="" style={{ width: 24, height: 24, borderRadius: 7 }} />
      <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c.paper }}>{label}</span>
    </div>
    <h2 style={{ margin: 0, fontFamily: display, fontSize: "clamp(30px, 3.2vw, 46px)", lineHeight: 1.06, fontWeight: 700, letterSpacing: "-0.015em", color: c.ink, textWrap: "balance" as never }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ margin: 0, maxWidth: "60ch", fontSize: 16.5, lineHeight: 1.6, color: c.text, textWrap: "pretty" as never }}>{subtitle}</p>
    )}
  </div>
);

export default SectionHeader;
