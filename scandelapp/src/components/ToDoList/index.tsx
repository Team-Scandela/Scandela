import { useEffect, useState } from 'react';
import {
    ToDoListWrapper,
    ToDoListContainer,
    ToDoListCard,
    ToDoListTitle,
    ToDoListDescription,
    ToDoListAdress,
    ToDoListMainTitle,
    ToDoListDropdown,
    ToDoListDropdownMenuItem1,
    ToDoListDropdownMenuItem2,
    ToDoListDropdownMenuItem3,
    ToDoListDropdownMenu,
    ErrorMessage,
} from './element.js';
import { Red, Green, Yellow } from '../../colors.js';
import { IoMdArrowDropdown } from 'react-icons/io';

import { getDecisions } from '../../utils/decisionsUtils';
import { setState, getState } from '../../utils/decisionsUtils';
import { useTranslation } from 'react-i18next';

interface ToDoListProps {
    keycode: string;
}

/** Reset password page of the app */
const ToDoList: React.FC<ToDoListProps> = ({ keycode }) => {
    const [decisionsSpecific, setDecisionsSpecific] = useState([]);
    const [states, setStates] = useState([]);
    const [dropdownShow, setDropdownShow] = useState([]);
    const [errorMessage, setErrorMessage] = useState(true);
    const [fetchDone, setFetchDone] = useState(false);

    const { t } = useTranslation();

    const toggleDropdown = (index: any) => {
        setDropdownShow((prevState: any) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleStateChange = (index: any, value: any) => {
        setStates((prevState: any) => ({
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
            seconds = '0' + seconds;
        }
        // delete the last 6 digits of the array.
        let milliseconds = (array[6] / 1000000).toString();
        if (milliseconds.length < 2) {
            milliseconds = '00' + milliseconds;
        } else if (milliseconds.length < 3) {
            milliseconds = '0' + milliseconds;
        }

        let date =
            year +
            '-' +
            month +
            '-' +
            day +
            'T' +
            hours +
            ':' +
            minutes +
            ':' +
            seconds +
            '.' +
            milliseconds +
            'Z';
        return date;
    }

    useEffect(() => {
        const fetchData = async () => {
            setFetchDone(false);
            if (decisionsSpecific.length === 0) {
                try {
                    const data = await getDecisions();
                    if (data != null) {
                        setErrorMessage(false);

                        const newDecisionsSpecific: any[] = [];
                        const newStates: string[] = [];
                        const newDropdownShow: boolean[] = [];
                        setFetchDone(false);

                        for (const element of data) {
                            if (element.validate != null) {
                                const elementValidate = arrayToISOString(element.validate);
                                setFetchDone(false);

                                try {
                                    const state: string = await getState(element.id);
                                    if (elementValidate === keycode) {
                                        setFetchDone(false);

                                        newDecisionsSpecific.push(element);
                                        newStates.push(state);
                                        newDropdownShow.push(false);
                                    }
                                } catch (error) {
                                    console.error("Erreur lors de la récupération de l'état :", error);
                                }
                            }
                            setFetchDone(false);
                        }
                        setFetchDone(true);
                        setDecisionsSpecific(newDecisionsSpecific);
                        setStates(newStates);
                        setDropdownShow(newDropdownShow);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des décisions :", error);
                }
            }
        };

        fetchData(); // Appel de la fonction asynchrone
    }, [keycode]);

    return (
        <ToDoListWrapper>
            <ToDoListMainTitle>To-Do List</ToDoListMainTitle>
            <ToDoListContainer>


                {fetchDone && decisionsSpecific.map((element: any, index) => (
                    <ToDoListCard key={index}>
                        <ToDoListDropdown
                            onClick={() => toggleDropdown(index)}
                            style={{
                                backgroundColor:
                                    states[index] === "inprogress"
                                        ? Yellow
                                        : states[index] === "done"
                                          ? Green
                                          : Red,
                            }}
                        >
                            {states[index] === "inprogress"
                                ? t('inProgress')
                                : states[index] === "done"
                                  ? t('done')
                                  : t('toDo')}
                            <IoMdArrowDropdown />
                        </ToDoListDropdown>
                        {dropdownShow[index] ? (
                            <ToDoListDropdownMenu>
                                <ToDoListDropdownMenuItem1
                                    onClick={() => {
                                        toggleDropdown(index);
                                        handleStateChange(index, "todo");
                                        setState(element.id, "todo")
                                    }}
                                >
                                    A faire
                                </ToDoListDropdownMenuItem1>
                                <ToDoListDropdownMenuItem2
                                    onClick={() => {
                                        toggleDropdown(index);
                                        handleStateChange(index, "inprogress");
                                        setState(element.id, "inprogress")

                                    }}
                                >
                                    En cours
                                </ToDoListDropdownMenuItem2>
                                <ToDoListDropdownMenuItem3
                                    onClick={() => {
                                        toggleDropdown(index);
                                        handleStateChange(index, "done");
                                        setState(element.id, "done")
                                    }}
                                >
                                    Terminé
                                </ToDoListDropdownMenuItem3>
                            </ToDoListDropdownMenu>
                        ) : null}
                        <ToDoListTitle>{element.solution}</ToDoListTitle>
                        <ToDoListDescription>
                            {element.description}
                        </ToDoListDescription>
                        <ToDoListAdress>
                            {element.location +
                                ' - ' +
                                element.lampDecision.lamp.name}
                        </ToDoListAdress>
                    </ToDoListCard>
                ))}
                {!fetchDone && (
                    <ErrorMessage>
                        {t('toDoLoading')}
                    </ErrorMessage>
                )}
            </ToDoListContainer>
        </ToDoListWrapper>
    );
};

export default ToDoList;
