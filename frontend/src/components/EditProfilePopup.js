import PopupWithForm from "./PopupWithForm";
import React from "react";
import { UserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const currentUser = React.useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }
    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm name="edit-profile" className="profile-edit"
                       onClose={onClose}
                       isOpen={isOpen}
                       isLoading={isLoading}
                       onSubmit={handleSubmit}
                       title='Редактировать профиль'
                       submitText='Сохранить'>
            <input name='userName'
                   id="edit-name-input"
                   type="text"
                   placeholder="Ваше имя"
                   minLength="2"
                   maxLength="40"
                   required
                   className="popup__input popup__input_type_name"
                   value={name || ""}
                   onChange={handleNameChange}


            />
            <span id="edit-name-input-error" className="popup__input-span popup__input-span_type_name"></span>
            <input name='userProfession'
                   id="edit-profession-input"
                   type="text"
                   minLength="2"
                   maxLength="200"
                   required
                   placeholder="О себе"
                   className="popup__input popup__input_type_profession"
                   value={description || ""}
                   onChange={handleDescriptionChange}/>
            <span id="edit-profession-input-error"
                  className="popup__input-span popup__input-span_type_profession"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;