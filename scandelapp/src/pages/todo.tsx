import { useParams } from 'react-router-dom';
import ToDoList from '../components/ToDoList';

interface ToDoProps {}

/** Reset password page of the app */
const ToDo: React.FC<ToDoProps> = () => {
    // get /:key from the URL
    const { key } = useParams<{ key: string }>();

    return (
        <ToDoList key={key} />
    );
};

export default ToDo;
