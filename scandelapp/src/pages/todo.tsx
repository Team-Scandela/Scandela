import { useParams } from 'react-router-dom';
import ToDoList from '../components/ToDoList';
import { useEffect } from 'react';

interface ToDoProps {}

/** Reset password page of the app */
const ToDo: React.FC<ToDoProps> = () => {
    // get /:key from the URL
    const { key } = useParams<{ key: string }>();

    useEffect(() => {
        console.log("keycode = " +  key);
    }, [key]);

    return (
        <ToDoList keycode={key} />
    );
};

export default ToDo;
