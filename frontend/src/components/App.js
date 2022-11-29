import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { defaultCurrentUser, CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {

    const history = useHistory();

    // Переменные состояния попапов главной страницы
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    // Переменные состояния для попапа открытия карточки 
    const [selectedCard, setSelectedCard] = useState({});
    const [isOpenPopupName, setIsOpenPopupName] = useState(false);
    // Переменная состояния карточек
    const [cards, setCards] = useState([]);
    // Переменная состояния попапа страницы регистрации
    const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
    // Переменная состояния зарегистрированного пользователя
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    // Переменная состояния пользователя
    const [currentUser, setCurrentUser] = useState(defaultCurrentUser);


    // Функция постановки лайков карточке
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
                openInfoTooltipPopup(false);
            });
    };


    // Функция удаления карточки
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((deletedCard) => {
                setCards((cards) => cards.filter((c) => c._id !== card._id))
            })
            .catch((err) => {
                console.log(err);
                openInfoTooltipPopup(false);
            })
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    const onCardClick = (card) => {
        setSelectedCard(card);
        setIsOpenPopupName(true);
    };

    const openInfoTooltipPopup = (isSignIn) => {
        setIsInfoTooltipPopup(true);
        setIsSignIn(isSignIn);
    };

    const closeAllPopups = () => {
        setIsOpenPopupName(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoTooltipPopup(false);
    };

    // Изменение данных профиля
    function handleUpdateUser(userData) {
        api.setUserInfo(userData)
            .then((userDataServer) => {
                setCurrentUser({ ...currentUser, ...userDataServer })
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
                openInfoTooltipPopup(false);
            })
    };

    // Изменение аватара профиля
    function handleUpdateAvatar(userAvatar) {
        api.setUserAvatar(userAvatar)
            .then((userAvatarServer) => {
                setCurrentUser({ ...currentUser, ...userAvatarServer })
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
                openInfoTooltipPopup(false);
            })
    };

    // Добавление новой карточки
    function handleAddPlaceSubmit(card) {
        api.createNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
                openInfoTooltipPopup(false);
            })
    };

    // Функция получения токена
    function checkToken() {
        const token = localStorage.getItem('jwt');
        api.setToken(token)
        if (token) {
            Promise.all([api.getUserInfo(), api.getAllCards()])
                .then(([user, cards]) => {
                    
                    if (user && user.data) {
                        setLoggedIn(true);
                        setCurrentUser(user.data);
                        setCards(cards.data);
                        history.push('/');
                    }else{
                        setLoggedIn(false);
                        history.push('/sign-in');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    openInfoTooltipPopup(false)
                })
        }else{
            setLoggedIn(false);
            history.push('/sign-in');
        }
    };

    React.useEffect(() => {
        checkToken();
    }, []);

    // Функция регистрация пользователя 
    function handleRegistration(registrationData) {
        api.register(registrationData)
            .then((result) => {
                if (result && result.data) {
                    openInfoTooltipPopup(true);
                    history.push('/sign-in');
                } else {
                    openInfoTooltipPopup(false);
                }
            })
            .catch((err) => {
                console.log(err);
                openInfoTooltipPopup(false);
            })
    };

    //Функция логина пользователя
    function handleLogin(loginData) {
        api.login(loginData)
            .then((result) => {
                if (result && result.token) {
                    setCurrentUser({ ...currentUser, email: loginData.email })
                    localStorage.setItem('jwt', result.token);
                    checkToken();
                } else {
                    openInfoTooltipPopup(false);
                }
            })
            .catch((err) => {
                console.log(err);
                openInfoTooltipPopup(false);
            })
    };

    function logOut() {
        setLoggedIn(false);
        setCurrentUser(defaultCurrentUser);
        localStorage.removeItem('jwt')
    };

    return (

        <CurrentUserContext.Provider value={currentUser}>

            <Header
                email={currentUser.email}
                loggedIn={loggedIn}
                logOut={logOut}
            />

            <Switch>
                <Route path="/sign-up">
                    <Register
                        onRegister={handleRegistration}
                    />
                </Route>
                <Route path="/sign-in">
                    <Login
                        onLogin={handleLogin}
                    />
                </Route>

                <ProtectedRoute
                    path="/"
                    onCardClick={onCardClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                    component={Main}
                    exact
                    loggedIn={loggedIn}
                />

            </Switch>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />


            <ImagePopup
                card={selectedCard}
                isOpen={isOpenPopupName}
                onClose={() => {
                    closeAllPopups();
                    setSelectedCard({});
                }}
            />

            <PopupWithForm
                name="delete"
                title="Вы уверены?"
                textSubmit="Да"
            />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />

            <InfoTooltip
                name="tooltip"
                isOpen={isInfoTooltipPopup}
                onClose={closeAllPopups}
                isSignIn={isSignIn}
            />

            <Footer />

        </CurrentUserContext.Provider>

    )
};

export default App;
