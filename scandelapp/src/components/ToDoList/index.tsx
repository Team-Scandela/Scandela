import { ToDoListWrapper, ToDoListContainer, ToDoListCard, ToDoListCheckBox, ToDoListTitle, ToDoListDescription, ToDoListAdress } from './element.js';


interface ToDoListProps {
    key : string;
}

/** Reset password page of the app */
const ToDoList: React.FC<ToDoListProps> = ( { key } ) => {

    return (
        <ToDoListWrapper>

            <ToDoListContainer >
                <ToDoListCard>
                    <ToDoListCheckBox type="checkbox" />
                    <ToDoListTitle> Chnager l'ampoule </ToDoListTitle>
                    <ToDoListDescription> Consommation trop élevé </ToDoListDescription>
                    <ToDoListAdress> Lamp 21456 14 rue du golf </ToDoListAdress>
                </ToDoListCard>
                <ToDoListCard>
                    <ToDoListCheckBox type="checkbox" />
                </ToDoListCard>

            </ToDoListContainer>
        </ToDoListWrapper>
    );
};

export default ToDoList;
