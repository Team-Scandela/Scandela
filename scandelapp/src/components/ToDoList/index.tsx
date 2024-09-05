import { useEffect, useState } from 'react';
import { ToDoListWrapper, ToDoListContainer, ToDoListCard, ToDoListTitle, ToDoListDescription, ToDoListAdress, ToDoListMainTitle,
    ToDoListDropdown,
    ToDoListDropdownMenuItem1,
    ToDoListDropdownMenuItem2,
    ToDoListDropdownMenuItem3,
    ToDoListDropdownMenu,
} from './element.js';
import { Red, Green, Yellow} from '../../colors.js';
import { IoMdArrowDropdown } from "react-icons/io";

import {
    getDecisions,
} from '../../utils/decisionsUtils';

interface ToDoListProps {
    keycode : string;
}

/** Reset password page of the app */
const ToDoList: React.FC<ToDoListProps> = ( { keycode } ) => {

    const [decisionsSpecific, setDecisionsSpecific] = useState([]);
    const [states, setStates] = useState([]);
    const [dropdownShow, setDropdownShow] = useState([]);

    const toggleDropdown = (index : any) => {
        setDropdownShow((prevState :  any) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleStateChange = (index : any, value : any) => {
        setStates((prevState : any) => ({
            ...prevState,
            [index]: value,
        }));
    };

    function arrayToISOString(array: number[]) {
        // 2024-08-22T08:54:09.065Z
        let year = array[0].toString();
        let month = array[1].toString();
        if (month.length < 2) {
            month = '0' + month;
        }
        let day = array[2].toString();
        if (day.length < 2) {
            day = '0' + day;
        }
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
        return date;
    }

    useEffect(() => {
        if (decisionsSpecific.length === 0) {
            getDecisions().then((data) => {
                if (data != null) {
                    const newDecisionsSpecific: any[] = [];
                    const newStates: number[] = [];
                    const newDropdownShow: boolean[] = [];
                    data.forEach((element: any) => {
                        if (element.validate != null) {
                            const elementValidate = arrayToISOString(element.validate);
                            console.log(elementValidate);
                            if (elementValidate === keycode) {
                                console.log(element);
                                newDecisionsSpecific.push(element);
                                newStates.push(1);
                                newDropdownShow.push(false);
                            }
                        }
                    });
                    setDecisionsSpecific(newDecisionsSpecific);
                    setStates(newStates);
                    setDropdownShow(newDropdownShow);
                }
            });
        }
    }, []);

    useEffect(() => {
        console.log('decisionsSpecific updated:', decisionsSpecific);
    }, [decisionsSpecific]);

    useEffect(() => {
        console.log('states updated:', states);
    }, [states]);

    useEffect(() => {
        console.log('dropdownShow updated:', dropdownShow);
    }, [dropdownShow]);



    return (
        <ToDoListWrapper>
            <ToDoListMainTitle>To-Do List</ToDoListMainTitle>
            <ToDoListContainer>
                {decisionsSpecific.map((element: any, index) => (
                    <ToDoListCard key={index}>
                        <ToDoListDropdown
                            onClick={() => toggleDropdown(index)}
                            style={{ backgroundColor: states[index] === 2 ? Yellow : states[index] === 3 ? Green : Red }}
                        >
                            {states[index] === 2 ? 'En cours' : states[index] === 3 ? 'Terminé' : 'A faire'}
                            <IoMdArrowDropdown />
                        </ToDoListDropdown>
                        {dropdownShow[index] ? (
                            <ToDoListDropdownMenu>
                                <ToDoListDropdownMenuItem1
                                    onClick={() => {
                                        toggleDropdown(index);
                                        handleStateChange(index, 1);
                                    }}
                                >
                                    A faire
                                </ToDoListDropdownMenuItem1>
                                <ToDoListDropdownMenuItem2
                                    onClick={() => {
                                        toggleDropdown(index);
                                        handleStateChange(index, 2);
                                    }}
                                >
                                    En cours
                                </ToDoListDropdownMenuItem2>
                                <ToDoListDropdownMenuItem3
                                    onClick={() => {
                                        toggleDropdown(index);
                                        handleStateChange(index, 3);
                                    }}
                                >
                                    Terminé
                                </ToDoListDropdownMenuItem3>
                            </ToDoListDropdownMenu>
                        ) : null}
                        <ToDoListTitle>{element.solution}</ToDoListTitle>
                        <ToDoListDescription>{element.description}</ToDoListDescription>
                        <ToDoListAdress>{element.location + ' - ' + element.lampDecision.lamp.name}</ToDoListAdress>
                    </ToDoListCard>
                ))}
            </ToDoListContainer>
        </ToDoListWrapper>
    );
};

export default ToDoList;
