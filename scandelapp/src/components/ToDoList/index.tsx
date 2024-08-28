import { useEffect, useState } from 'react';
import { ToDoListWrapper, ToDoListContainer, ToDoListCard, ToDoListCheckBox, ToDoListTitle, ToDoListDescription, ToDoListAdress } from './element.js';

import {
    getDecisions,
} from '../../utils/decisionsUtils';

interface ToDoListProps {
    keycode : string;
}

/** Reset password page of the app */
const ToDoList: React.FC<ToDoListProps> = ( { keycode } ) => {

    const [decisions, setDecisions] = useState([]);
    const [decisionsSpecific, setDecisionsSpecific] = useState([]);

    function arrayToISOString(array: number[]) {
        console.log(array);
        const year = array[0];
        const month = array[1];
        const day = array[2];
        const hours = array[3];
        const minutes = array[4];
        const seconds = array[5];
        const milliseconds = array[6];

        let date = new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds)).toISOString();
        return date;
    }

    useEffect(() => {
        if (decisions.length === 0)
        {
            getDecisions().then((data) => {
                setDecisions(data);

                data.forEach((element : any) => {
                    if (element.validate != null) {
                        const elementValidate = arrayToISOString(element.validate);
                        console.log(elementValidate);
                        if (elementValidate === keycode)
                        {
                            setDecisionsSpecific((decisionsSpecific) => [...decisionsSpecific, element]);
                            console.log(element);
                        }
                    }
                });
                console.log(decisionsSpecific);
            });
        }
    }, []);




    return (
        <ToDoListWrapper>

            <ToDoListContainer >
                <ToDoListCard>
                    <ToDoListCheckBox type="checkbox" />
                    <ToDoListTitle> Chnager l'ampoule </ToDoListTitle>
                    <ToDoListDescription> Consommation trop élevé </ToDoListDescription>
                    <ToDoListAdress> {keycode} </ToDoListAdress>
                </ToDoListCard>
                <ToDoListCard>
                    <ToDoListCheckBox type="checkbox" />
                </ToDoListCard>

            </ToDoListContainer>
        </ToDoListWrapper>
    );
};

export default ToDoList;
