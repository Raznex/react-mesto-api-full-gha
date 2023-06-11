import React from 'react';
import {Api} from "../utils/Api.js";
import '../App.css';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import {options} from "../utils/constant";
import {UserContext} from "../contexts/CurrentUserContext.js"
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup";
import {Routes, Route} from "react-router-dom";
import InfoToolTip from "./InfoToolTip.js";
import {Navigate, useNavigate} from "react-router-dom";
import * as auth from "../utils/Auth.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userData, setUserData] = React.useState('');
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const api = new Api(options)
    const navigate = useNavigate()
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }

        if (isOpen) { // навешиваем только при открытии
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])


    React.useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getInfoProfile(), api.getInitialCards()])
                .then(([data, cards]) => {
                    setCurrentUser(data);
                    setCards(cards.data.reverse());
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setIsDataLoaded(true);
                });
        }
    }, [loggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i[0] === currentUser.user._id);
        if (isLiked) {
            api
                .deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard.data : c))
                    );
                })
                .catch((err) => console.log(err));
        } else {
            api
                .setLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard.data : c))
                    );
                })
                .catch((err) => console.log(err));
        }
    }

    function handleDeleteCard(card) {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((newArray) =>
                    newArray.filter((item) => card._id !== item._id)
                );
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api
            .editProfile(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }

    function handleAddPlace(data) {
        setIsLoading(true);
        api
            .createCard(data)
            .then((newCard) => {
                setCards([newCard.data, ...cards])
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }
    function handleUpdateAvatar(avatar) {
        setIsLoading(true);
        api
            .changeAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }


    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setIsSuccessPopupOpen(false)
    }

    function regSuccess(successed) {
        setIsSuccessPopupOpen(true);
        setIsSuccess(successed);
    }

    function regError(err) {
        setErrorMessage(err);
    }

    const cbCheckToken = () => {
        if (localStorage.getItem("token")) {
            auth
                .getToken(localStorage.getItem("token"))
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setUserData(res.user.email);
                        navigate("/", {replace: true});
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    React.useEffect(() => {
        cbCheckToken();
    }, []);


    function cbRegister(formValue) {
        setIsLoading(true);
        auth
            .register(formValue.email, formValue.password)
            .then((res) => {
                if (res.error === 'Bad Request') {
                    regSuccess(false);
                } else {
                    console.log(res)
                    regSuccess(true);
                    navigate("/signin", {replace: true});
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    regSuccess(false);
                    console.log("Error: Email already taken");
                } else {
                    regError(err);
                }
            })
            .finally(() => setIsLoading(false));
    }

    function cbLogin(formValue) {
        setIsLoading(true);

        auth.authorize(formValue.email, formValue.password)
            .then((res) => {
                if (res.token) {
                    console.log(res);
                    setLoggedIn(true);
                    navigate("/", {replace: true});
                    setUserData(formValue.email)
                } else {
                    throw new Error("Неверный формат ответа сервера");
                }
            })
            .catch((err) => {
                console.log(err);
                regSuccess(false);
            })
            .finally(() => setIsLoading(false));
    }

    function cbLogout() {
        setLoggedIn(false);
        setUserData('')
        localStorage.removeItem('token')
    }
// console.log(cards)
    return (

        <UserContext.Provider value={currentUser}>
            <div className="page">
                <InfoToolTip/>
                <Header email={userData} onLogout={cbLogout}/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            loggedIn ? (
                                <Navigate to="/react-mesto-auth" replace/>
                            ) : (
                                <Navigate to="/signin" replace/>
                            )
                        }/>
                    <Route
                        path="/react-mesto-auth"
                        element={
                            <ProtectedRoute
                                element={Main}
                                cards={cards}
                                isDataLoaded={isDataLoaded}
                                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                                handleCardClick={setSelectedCard}
                                handleCardLike={handleCardLike}
                                handleDeleteClick={handleDeleteCard}
                                loggedIn={loggedIn}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Register onRegister={cbRegister} isLoading={isLoading} isLogin={loggedIn}/>
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <Login onLogin={cbLogin} isLoading={isLoading} isLogin={loggedIn}/>
                        }
                    />
                </Routes>

                <Footer/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                  onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}
                                  isLoading={isLoading}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen}
                               onClose={closeAllPopups}
                               onAddPlace={handleAddPlace}
                               isLoading={isLoading}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                 onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}
                                 isLoading={isLoading}/>
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                <PopupWithForm name="delete-card-form"
                               className="delete-card"
                               title='Вы уверены?'
                               submitText='Да'
                >
                </PopupWithForm>
                <InfoToolTip
                    isOpen={isSuccessPopupOpen}
                    onClose={closeAllPopups}
                    isSuccess={isSuccess}
                    errorMessage={errorMessage}
                />
            </div>
        </UserContext.Provider>

    );
}

export default App;
