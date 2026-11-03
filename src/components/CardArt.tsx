import React, { useState, useRef } from "react";

export interface AssetStatus {
  key: string;
  filename: string;
  label: string;
  type: "pack" | "logo";
  status: "ready" | "synced";
}

export const ASSET_DEFINITIONS: AssetStatus[] = [
  { key: "moonshine", filename: "moonshine_kQTGwZ0AM.png", label: "Moonshine Booster Pack", type: "pack", status: "ready" },
  { key: "megavault", filename: "Mega_vault_tBtgVyFSL.png", label: "Mega Vault Booster Pack", type: "pack", status: "ready" },
  { key: "templerun", filename: "temple_run_a88GzufHW.png", label: "Temple Run Booster Pack", type: "pack", status: "ready" },
  { key: "drizzle", filename: "drizzle.png", label: "Drizzle Booster Pack", type: "pack", status: "ready" },
  { key: "jelly", filename: "jelly.png", label: "Jelly Booster Pack", type: "pack", status: "ready" },
  { key: "packy-logo", filename: "image-8.png", label: "PACKY.GG Official Logo", type: "logo", status: "ready" },
  { key: "rain-logo", filename: "IMG_eb918c47-61dd-480d-92d5-29d6010d1c08.png", label: "RAIN.GG Official Logo", type: "logo", status: "ready" }
];

export async function uploadAssetFile(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const dataBase64 = reader.result as string;
        const res = await fetch("/api/upload-asset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, dataBase64 })
        });
        resolve(res.ok);
      } catch (e) {
        console.error("Upload error:", e);
        resolve(false);
      }
    };
    reader.onerror = () => resolve(false);
    reader.readAsDataURL(file);
  });
}

export function PackArt({
  packKey,
  className = "",
  style = {}
}: {
  packKey: "moonshine" | "megavault" | "templerun" | "drizzle" | "jelly" | string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const filename =
    packKey === "moonshine" || packKey.includes("moon")
      ? "moonshine_kQTGwZ0AM.png"
      : packKey === "megavault" || packKey.includes("mega")
      ? "Mega_vault_tBtgVyFSL.png"
      : packKey === "drizzle" || packKey.includes("driz")
      ? "drizzle.png"
      : packKey === "jelly" || packKey.includes("jell")
      ? "jelly.png"
      : "temple_run_a88GzufHW.png";

  const imgSrc = `/img/${filename}`;

  return (
    <div
      className={`foil-pack-card-box ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "14px",
        background: "linear-gradient(135deg, rgba(0, 132, 255, 0.15) 0%, rgba(4, 20, 43, 0.95) 100%)",
        border: "1px solid rgba(0, 132, 255, 0.35)",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        overflow: "hidden",
        ...style
      }}
    >
      {}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 20%, rgba(0, 132, 255, 0.25) 0%, transparent 70%)",
          pointerEvents: "none"
        }}
      />
      <img
        src={imgSrc}
        alt={packKey}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "8px",
          display: "block",
          filter: "drop-shadow(0 8px 20px rgba(0, 132, 255, 0.5))",
          position: "relative",
          zIndex: 2
        }}
      />
    </div>
  );
}

export function AssetSyncModal({
  isOpen,
  onClose,
  onAssetsUpdated
}: {
  isOpen: boolean;
  onClose: () => void;
  onAssetsUpdated?: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [syncedFiles, setSyncedFiles] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const newSynced = { ...syncedFiles };
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ok = await uploadAssetFile(file);
      if (ok) {
        newSynced[file.name] = true;
      }
    }
    setSyncedFiles(newSynced);
    setUploading(false);
    if (onAssetsUpdated) onAssetsUpdated();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(10px)",
        display: "grid",
        placeItems: "center",
        padding: "16px"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#04142b",
          border: "1px solid rgba(0, 132, 255, 0.4)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "600px",
          padding: "28px",
          boxShadow: "0 30px 70px rgba(0, 0, 0, 0.9)",
          color: "#fff"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800 }}>Packy.gg Asset Manager</h3>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--mute)" }}>
              Official uploaded card boxes & logo active.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "none",
              color: "#fff",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              fontSize: "18px",
              display: "grid",
              placeItems: "center"
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "12px",
            marginBottom: "24px"
          }}
        >
          {ASSET_DEFINITIONS.map((asset) => (
            <div
              key={asset.key}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: asset.type === "pack" ? "90px" : "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px"
                }}
              >
                <img
                  src={`/img/${asset.filename}`}
                  alt={asset.label}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "4px"
                  }}
                />
              </div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>
                {asset.label}
              </span>
              <code style={{ fontSize: "9px", color: "var(--mute)" }}>{asset.filename}</code>
            </div>
          ))}
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: "2px dashed rgba(0, 132, 255, 0.4)",
            borderRadius: "14px",
            padding: "24px",
            textAlign: "center",
            cursor: "pointer",
            background: "rgba(0, 132, 255, 0.04)",
            marginBottom: "20px"
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>📁</div>
          <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>
            {uploading ? "Uploading & Syncing..." : "Click or Drag & Drop images to re-upload"}
          </div>
          <div style={{ fontSize: "12px", color: "var(--mute)" }}>
            Accepts PNG, JPG, WebP. Overwrite assets live anytime.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            className="btn primary"
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              fontWeight: 800,
              fontSize: "14px"
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
