import React, { useEffect } from 'react';

const GestureControl = ({ onGesture }) => {
    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                onGesture();
            }
        });
    }, [onGesture]);

    return <p>✋ Gesture Control Enabled (Press Enter)</p>;
};

export default GestureControl;