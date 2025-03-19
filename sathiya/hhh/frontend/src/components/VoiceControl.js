import React, { useEffect } from 'react';

const VoiceControl = ({ onCommand }) => {
    useEffect(() => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.onresult = (event) => {
            const command = event.results[event.results.length - 1][0].transcript;
            onCommand(command);
        };

        recognition.start();
        return () => recognition.stop();
    }, [onCommand]);

    return <p>🎤 Voice Control Active</p>;
};

export default VoiceControl;