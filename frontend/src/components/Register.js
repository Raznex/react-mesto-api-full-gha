import React from "react";
import {Link, Navigate} from "react-router-dom";


function Register({onRegister, isLogin, isLoading}) {
    const [formValue, setFormValue] = React.useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(formValue);
    }

    if (isLogin) {
return <Navigate to="/"/>
    }

    return (
        <div className="register">
            <form
                className="login__form"
                onSubmit={handleSubmit}
            >
                <h2 className="login__title">Регистрация</h2>
                <input
                    type="email"
                    id="email-field"
                    className="login__field"
                    minLength="2"
                    maxLength="30"
                    required
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={formValue.email || ""}
                />
                <input
                    type="password"
                    id="password-field"
                    className="login__field"
                    minLength="2"
                    maxLength="40"
                    required
                    placeholder="Пароль"
                    name="password"
                    value={formValue.password || ""}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="login__submit"
                    name="submit"
                >
                    {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </button>
                <Link to="/signin" className="register__have-login">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    );
}

export default Register;