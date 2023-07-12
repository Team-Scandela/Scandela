import * as React from 'react'

/** Test page of the app */
const Test: React.FC = () => {

    const [lamp, setLamp] = React.useState<string>(null);

    React.useEffect(() => {
        getLamp();
    }, [])

    function getLamp() {
        fetch('http://localhost:3001/lamp', {
            method: 'GET'
        })
            .then(response => response.text())
            .then(data => {
                setLamp(data);
            })
    }

    function createLamp() {
        let lat = prompt('Enter latitude');
        let lng = prompt('Enter longitude');

        fetch('http://localhost:3001/lamp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lat: lat, lng: lng })
        })
            .then(response => response.text())
            .then(data => {
                setLamp(data);
            })
    }

    function deleteLamp() {
        let uuid = prompt('Enter uuid');
        fetch(`http://localhost:3001/lamp/${uuid}`, {
            method: 'DELETE'
        })
            .then(response => response.text())
            .then(data => {
                setLamp(data);
            })
    }

    return (
        <div>
            {lamp ? lamp : 'There is no lamp data available'}
            <button onClick={createLamp}>Add Lamp</button>
            <button onClick={deleteLamp}>Delete Lamp</button>
        </div>
    )
}

export default Test