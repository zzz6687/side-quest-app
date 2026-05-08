import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      await handleLogin();
    } catch (error) {
      alert("Ошибка соединения с сервером");
    }
  };

  const handleUsernameChange = (value) => {
    return setUsername(value);
  };

  const handlePasswordChange = (value) => {
    return setPassword(value);
  };

  const handleLogin = async () => {
    if (!username) return;

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      alert("Ошибка соединения с сервером");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>✦ Добро пожаловать</p>
      <div className={styles.field}>
        <label>Имя пользователя</label>
        <input
          type="text"
          name="username"
          placeholder="логин..."
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Пароль</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
      </div>
      <button
        className={styles.btn}
        onClick={isRegister ? handleRegister : handleLogin}
      >
        {isRegister ? "Зарегистрироваться" : "Войти"}
      </button>

      <p>
        {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}
        <a onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? " Войти" : " Зарегистрироваться"}
        </a>
      </p>
    </div>
  );
};

export default Login;
