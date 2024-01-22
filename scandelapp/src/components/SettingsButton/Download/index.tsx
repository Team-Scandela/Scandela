import * as React from 'react';
import { DownloadButton } from './elements';

/** Download setting component props
 * @param {boolean} isDark - If the mode is dark or not
 */

interface DownloadProps {
    isDark: boolean;
}

const Download: React.FC<DownloadProps> = ({ isDark }) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    function launchScript(argument: string) {
        fetch(`http://db.scandela.fr/script`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ argument }),
        }).then((response) => response.text());
    }

    const downloadData = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsText(e.target.files[0], 'UTF-8');
            reader.onload = (evt) => {
                if (evt.target) {
                    const fileContent = evt.target.result;
                    launchScript(fileContent as string);
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
