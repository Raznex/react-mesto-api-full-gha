import React from 'react';
import Card from './Card.js';
import {UserContext} from "../contexts/CurrentUserContext.js"

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, handleCardClick, handleCardLike,  handleDeleteClick, isDataLoaded}) {
    const currentUser = React.useContext(UserContext);
    return (
        <main className="content">
            {isDataLoaded ? (
            <div>
            <section className="profile">
                <div className="profile__card">
                    <button className="profile__container-avatar" type="button" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={currentUser.user && currentUser.user.avatar} alt="Аватар"/>
                    </button>
                    <div className="profile__profile-info">
                        <div className="profile__title">
                            <h1 className="profile__name">{currentUser.user && currentUser.user.name}</h1>
                            <button name='popup-edit-open' type="button" className="profile__edit-button"
                                    onClick={onEditProfile}/>
                        </div>
                        <p className="profile__profession">{currentUser.user && currentUser.user.about}</p>
                    </div>
                </div>
                <button name='popup-add-open' type="button" className="profile__add-button"
                        onClick={onAddPlace}/>
            </section>
            <section className="elements">
                {
                    Array.isArray(cards) && cards.length > 0 ? (
                        cards.map((card) => (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleDeleteClick}
                            />
                        ))
                    ) : (
                        <p>No cards available</p>
                    )
                }
            </section>
            </div>
            ) : (
                <p>Loading...</p> // Индикатор загрузки или другой компонент
            )}
        </main>
    );
}

export default Main;