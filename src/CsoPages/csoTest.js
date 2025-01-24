// components/RemittanceProgressBar.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRemittanceProgress } from '../redux/slices/csoSlice';


const RemittanceProgressBar = () => {
  const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
  
  const { remittanceProgress, loading, error } = useSelector((state) => state.cso);

const workId = user.workId

  useEffect(() => {
    if (workId) {
      dispatch(fetchRemittanceProgress(workId)); // Fetch remittance progress for this CSO
    }
  }, [dispatch, workId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <p>Remittance Progress for Today:</p>
      <div style={{ width: '100%', backgroundColor: '#f3f3f3' }}>
        <div
          style={{
            width: `${remittanceProgress}%`,
            height: '20px',
            backgroundColor: remittanceProgress === 100 ? 'green' : 'red',
          }}
        ></div>
      </div>
      <p>{remittanceProgress}%</p>
    </div>
  );
};

export default RemittanceProgressBar;
