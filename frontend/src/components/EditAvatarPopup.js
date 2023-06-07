import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    const avatarRef = React.createRef("");

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm name="new-avatar-form"
                       className="new-avatar"
                       onClose={onClose}
                       isOpen={isOpen}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
                       title='Обновить аватар'
                       submitText='Сохранить'>
            <input name='newAvatar' id="change-new-avatar" type="url" placeholder="Ссылка на картинку"
                   minLength="2"
                   maxLength="infinity" required
                   ref={avatarRef}
                   className="popup__input popup__input_type_name"
                   defaultValue=""/>
            <span id="change-new-avatar-error" className="popup__input-span"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;