import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

    const [cardName, setCardName] = React.useState("");
    const [link, setLink] = React.useState("");
    React.useEffect(() => {
        setCardName("");
        setLink("");
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: cardName,
            link,
        });
    }
    function handleCardNameChange(e) {
        setCardName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm name="add-form"
                       className="card-add"
                       onClose={onClose}
                       isOpen={isOpen}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
                       title='Новое место'
                       submitText='Сохранить'>
            >
            <input name='cardName'
                   id="add-name-input"
                   type="text"
                   placeholder="Название"
                   minLength="2"
                   maxLength="30"
                   onChange={handleCardNameChange}
                   value={cardName}
                   required
                   className="popup__input popup__input_type_name"/>
            <span id="add-name-input-error" className="popup__input-span"></span>
            <input name='cardSrc'
                   id="add-url-input"
                   type="url"
                   placeholder="Ссылка на картинку"
                   onChange={handleLinkChange}
                   value={link}
                   required
                   className="popup__input popup__input_type_profession"/>
            <span id="add-url-input-error" className="popup__input-span popup__input-span_type_profession"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;