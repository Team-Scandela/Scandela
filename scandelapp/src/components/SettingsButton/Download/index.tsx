import * as React from 'react';
import { DownloadButton } from './elements';

/** Download setting component props
 * @param {boolean} isDark - If the mode is dark or not
 */

interface DownloadProps {
    isDark: boolean;
}

interface Lamp {
    name: string;
    address: string;
    lat : number;
    long : number;
    lighton : string;
    lightoff : string;
    height : number;
    lamptype : string;
    foyertype : string;
}

const Download: React.FC<DownloadProps> = ({ isDark }) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const addToDB = async (data: Lamp[]) => {
        for (const lamp of data) {
            try {
                const username = 'tester';
                const password = 'T&st';
                const response = await fetch(
                    'http://db.scandela.fr/lamps/create',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Basic ${btoa(`${username}:${password}`)}`
                        },
                        body: JSON.stringify({
                            name: lamp.name,
                            address: lamp.address,
                            lat: lamp.lat,
                            long: lamp.long,
                            // lighton: lamp.lighton,
                            // lightoff: lamp.lightoff,
                            height: lamp.height,
                            lamptype: lamp.lamptype,
                            foyertype: lamp.foyertype,
                        }),
                    }
                );
                const responsebody = await response.text();
                console.log(responsebody);
                console.log(response);
                if (!response.ok) {
                    console.error(`Failed to add ${lamp.name} to the database. Status: ${response.status}`);
                }
            } catch (error) {
                console.error(`Error adding ${lamp.name} to the database: ${error.message}`);
            }
        }
    };

    const parseData = (data: any) => {
        const lampList: Lamp[] = [];
        if (Array.isArray(data)) {
            data.forEach((element: any) => {
                const lamp: Lamp = {
                    name: element.fields.numero,
                    address: element.fields.nom_voie,
                    lat: element.geometry.coordinates[1],
                    long: element.geometry.coordinates[0],
                    lighton: element.fields.type_lampe,
                    lightoff: element.fields.type_foyer,
                    height: element.fields.hauteur_support,
                    lamptype: element.fields.type_lampe,
                    foyertype: element.fields.type_foyer,
                };
                lampList.push(lamp);
            });
        } else {
            console.error(
                'The file is not an array, please check the file format'
            );
        }
        return lampList;
    };

    const downloadData = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsText(e.target.files[0], 'UTF-8');
            reader.onload = (evt) => {
                if (evt.target) {
                    const fileContent = evt.target.result;
                    const parsedData = parseData(JSON.parse(fileContent as string));
                    addToDB(parsedData);
                }
            };
        }
    };

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            <DownloadButton onClick={() => openFilePicker()}></DownloadButton>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={downloadData}
            />
        </div>
    );
};

export default Download;
