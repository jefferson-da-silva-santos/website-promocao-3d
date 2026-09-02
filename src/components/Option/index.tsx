import useModalDesvendando from "../../hooks/useModalDesvendando";
import { c, display } from "../../theme";

const Option = () => {
  const { showOption, setShowOption, titleModal, textModal, imgModal } = useModalDesvendando();

  if (!showOption) return null;

  return (
    <div
      onClick={() => setShowOption(false)}
      style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(22, 19, 15, 0.86)" }}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="p3d-grid-2"
        style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)", width: "min(880px, 92vw)", maxHeight: "88vh", overflow: "hidden", background: c.paper, border: `3px solid ${c.ink}`, borderRadius: 20, boxShadow: `12px 12px 0 ${c.red}` }}
      >
        <button
          onClick={() => setShowOption(false)}
          aria-label="Fechar"
          style={{ position: "absolute", top: 14, right: 14, zIndex: 2, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: "50%", background: c.ink, color: c.paper, border: `2px solid ${c.paper}`, cursor: "pointer" }}
        >
          <i className="bx bx-x" style={{ fontSize: 22 }} />
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "34px 30px", overflowY: "auto" }}>
          <span style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 7, background: c.ink, color: c.paper, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 999 }}>
            Desvendando
          </span>
          <h1 style={{ margin: 0, fontFamily: display, fontSize: "clamp(24px, 2.4vw, 32px)", lineHeight: 1.12, fontWeight: 700, color: c.ink, textWrap: "balance" as never }}>{titleModal}</h1>
          <div style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: 16, background: c.white, border: `2px solid ${c.ink}`, borderRadius: 14 }}>
            <i className="bx bx-check" style={{ fontSize: 20, color: c.green, flex: "none", marginTop: 1 }} />
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.62, color: c.text, textWrap: "pretty" as never }}>{textModal}</p>
          </div>
        </div>

        <div style={{ minWidth: 0, background: c.ink }}>
          <img src={imgModal} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </aside>
    </div>
  );
};

export default Option;
