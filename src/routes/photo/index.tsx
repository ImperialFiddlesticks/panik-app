import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { fakeAnalyzeSign } from "./-fakeAnalyzeSign";
import type { PhotoSignType } from "./-fakeAnalyzeSign";
import { mockSigns } from "./-mockSigns";

export const Route = createFileRoute("/photo/")({
  component: PhotoScreen,
});

function PhotoScreen() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<File | null>(null);
  const [exampleType, setExampleType] = useState<PhotoSignType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!photo && !exampleType) return;

    setIsLoading(true);

    const signType = await fakeAnalyzeSign(exampleType ?? photo!);

    navigate({
      to: "/result",
      search: { method: "photo", signType },
    });
  };

  return (
    <div className="photo-screen-container">
      <div className="photo-area">
        {/* STACK holds the upload box + example buttons */}
        <div className="photo-stack">
          {/* Upload / Preview */}
          {!photo ? (
            <label className="photo-upload">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setPhoto(f);
                    setExampleType(null); // if user uploads, clear example selection
                  }
                }}
              />

              <div className="photo-placeholder">
                <img
                  src="/photo-placeholder.png"
                  alt=""
                  className="placeholder-icon"
                />
                <p>Tap to upload a parking sign</p>
              </div>
            </label>
          ) : (
            <div className="photo-preview">
              <img
                src={URL.createObjectURL(photo)}
                alt="Parking sign preview"
              />
              <button
                type="button"
                onClick={() => {
                  setPhoto(null);
                }}
              >
                Change photo
              </button>
            </div>
          )}

          <div className="photo-examples">
            <p className="photo-examples-title">Or try an example:</p>

            <div className="photo-examples-buttons">
              {mockSigns.map((sign) => (
                <button
                  key={sign.type}
                  type="button"
                  className={`example-btn ${exampleType === sign.type ? "is-selected" : ""}`}
                  onClick={() => {
                    setExampleType(sign.type);
                    setPhoto(null);
                  }}
                >
                  <img
                    src={sign.image}
                    alt={sign.label}
                    className="example-image"
                  />
                  <span>{sign.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="screen-submit">
        <SubmitButton
          label="Can I park here?!"
          loadingLabel="Analyzing..."
          isLoading={isLoading}
          disabled={!photo && !exampleType}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
