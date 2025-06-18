// src/components/ImageUploader.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUpload, uploadImages } from '../redux/slices/uploadSlice';

const ImageUploader = () => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { urls, loading, error } = useSelector((state) => state.upload);

  const handleChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = () => {
    if (files.length === 0) return alert('Please select files');

    dispatch(uploadImages({ files, folderName: 'products' })); 
  };

  const handleReset = () => {
    dispatch(resetUpload());
    setFiles([]);
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      <button onClick={handleReset}>Reset</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {urls.length > 0 && (
        <div>
          <h3>Uploaded Images</h3>
          <ul>
            {urls.map((url, i) => (
              <li key={i}>
                <img src={`https://api.jksolutn.com${url}`} alt="uploaded" width="100" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
