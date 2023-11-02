import React, { useState } from 'react';
import Copilot from '../components/copilot';
import RubixCopilot from '../components/copilot_rubix';

function HomePage() {
  const [showRubix, setShowRubix] = useState(false);

  const toggleSwitch = () => {
    setShowRubix(!showRubix);
  };

  return (
    <div className='homepage'>
      <div className='switch'>
        <div className={`toggle-switch ${showRubix ? 'on' : 'off'}`} onClick={toggleSwitch}>
          <div className={`toggle-knob ${showRubix ? 'on' : 'off'}`}></div>
        </div>
      </div>

      {showRubix ? (
        <RubixCopilot />
      ) : (
        <Copilot />
      )}

    </div>
  );
}

export default HomePage;
