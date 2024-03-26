import React, { useState } from 'react';

interface TimePickerProps {
    onSelectTime: (hour: number) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onSelectTime }) => {
    const [selectedHour, setSelectedHour] = useState<number>(12); // Heure par défaut, 12:00

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newHour = Math.round((parseInt(event.target.value) * 23) / 100); // Convertit la position du slider en heure (0-23)
        setSelectedHour(newHour);
    };

    const handleValidateClick = () => {
        onSelectTime(selectedHour);
    };

    return (
        <div className="time-picker-container">
            <h2>Horaires</h2>
            <div className="slider-container">
                <span>00:00</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={(selectedHour * 100) / 23}
                    onChange={handleSliderChange}
                    title={`Sélectionnez l'heure (${selectedHour}:00)`}
                />
                <span>23:00</span>
            </div>
            <p>{selectedHour < 10 ? `0${selectedHour}` : selectedHour}:00</p>
            <button onClick={handleValidateClick}>Valider</button>
        </div>
    );
};

export default TimePicker;
