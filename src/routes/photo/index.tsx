import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { SubmitButton } from '../../components/SubmitButton/SubmitButton'

export const Route = createFileRoute('/photo/')({
  component: PhotoScreen,
})

function PhotoScreen() {

  const navigate = useNavigate();

  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if(!photo) return;

    setIsLoading(true);
    navigate({
      to:"/result",
      search: {method:"photo"},
    });
  }
  return <div className="photo-screen-container">
    <div className="photo-area">
      {!photo ? (
        <label className="photo-upload">
          <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          hidden onChange={(e)=>{
            if (e.target.files?.[0]){
              setPhoto(e.target.files[0]);
            }
          }}
          />
          <div className="photo-placeholder">
            <img src="/photo-placeholder.png" alt="Placeholder Icon" className="placeholder-icon"/>
            <p>Tap to upload a parking sign</p>
          </div>
        </label>
      ) : (
        <div className="photo-preview">
          <img src={URL.createObjectURL(photo)}
          alt="Parking sign preview"/>
          <button onClick={()=> setPhoto(null)}>Change photo</button>
        </div>
      )}
    </div>
    <div className="screen-submit">
      <SubmitButton label="Can I park here?!" loadingLabel='Analyzing...' isLoading={isLoading} disabled={!photo} onClick={handleSubmit}/>
    </div>
  </div>
}
