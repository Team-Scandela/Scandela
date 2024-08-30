import { useEffect, useState } from 'react';
import { ToDoListWrapper, ToDoListContainer, ToDoListCard, ToDoListCheckBox, ToDoListTitle, ToDoListDescription, ToDoListAdress, ToDoListMainTitle } from './element.js';

import {
    getDecisions,
} from '../../utils/decisionsUtils';

interface ToDoListProps {
    keycode : string;
}

/** Reset password page of the app */
const ToDoList: React.FC<ToDoListProps> = ( { keycode } ) => {

    const [decisionsSpecific, setDecisionsSpecific] = useState([]);
    const [dayMonth, setDayMonth] = useState("To-Do List du ");

    function arrayToISOString(array: number[]) {
        // 2024-08-22T08:54:09.065Z
        console.log(array);
        let year = array[0].toString();
        let month = array[1].toString();
        if (month.length < 2) {
            month = '0' + month;
        }
        let day = array[2].toString();
        if (day.length < 2) {
            day = '0' + day;
        }
        if (dayMonth === "To-Do List du ")
            setDayMonth(dayMonth + day + '/' + month);
        let hours = array[3].toString();
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        let minutes = array[4].toString();
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }
        let seconds = array[5].toString();
        if (seconds.length < 2) {
            seconds = '0' + seconds
        }
        // delete the last 6 digits of the array.
        let milliseconds = (array[6] / 1000000).toString();
        if (milliseconds.length < 2) {
            milliseconds = '00' + milliseconds;
        } else if (milliseconds.length < 3) {
            milliseconds = '0' + milliseconds;
        }

        let date = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds + 'Z';
        console.log(date);
        return date;
    }

    useEffect(() => {
        if (decisionsSpecific.length === 0)
        {
            getDecisions().then((data) => {
                if (data != null) {
                    data.forEach((element : any) => {
                        if (element.validate != null) {
                            const elementValidate = arrayToISOString(element.validate);
                            console.log(elementValidate);
                            if (elementValidate === keycode)
                                setDecisionsSpecific((decisionsSpecific) => [...decisionsSpecific, element]);
                        }
                    });
                }

            });
        }
    }, []);



    return (
        <ToDoListWrapper>
            <ToDoListMainTitle>{dayMonth}</ToDoListMainTitle>
            <ToDoListContainer >
                <ToDoListCard>
                    <ToDoListCheckBox type="checkbox" />
                    <ToDoListTitle> Chnager l'ampoule </ToDoListTitle>
                    <ToDoListDescription> Consommation trop élevé </ToDoListDescription>
                    <ToDoListAdress> 12 hameau du chateau </ToDoListAdress>
                </ToDoListCard>
                <ToDoListCard>
                    <ToDoListCheckBox type="checkbox" />
                </ToDoListCard>
                <ToDoListCard>
                    <ToDoListCheckBox type="checkbox" />
                </ToDoListCard>
                <ToDoListCard>
                    <ToDoListCheckBox type="checkbox" />
                </ToDoListCard>

            </ToDoListContainer>
        </ToDoListWrapper>
    );
};

export default ToDoList;
