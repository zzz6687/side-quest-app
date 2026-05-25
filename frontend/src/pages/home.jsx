import { useState } from "react";
import styles from "./home.module.css";

const Home = () => {
  const [quest, setQuest] = useState(() => {
    const saved = localStorage.getItem("currentQuest");
    return saved ? JSON.parse(saved) : null;
  });
  const [status, setStatus] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const getRandomQuest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quests`,
        {
          method: "GET",
        }
      );

      const quests = await response.json();

      if (!response.ok) {
        alert(quests.message);
        return;
      }

      const randomQuest = quests[Math.floor(Math.random() * quests.length)];
      setQuest(randomQuest);
      localStorage.setItem("currentQuest", JSON.stringify(randomQuest));
      setStatus(null);
      setPreviewImg(null);
      setImageFile(null);
    } catch (error) {
      alert("Ошибка соединения с сервером");
    }
  };

  const acceptBtnClick = () => {
    setStatus("pending");
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // сам файл для отправки на сервер
    setPreviewImg(URL.createObjectURL(file)); // превью для показа на экране
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("quest", quest._id);
    formData.append("user", user._id);
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/submission`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setStatus("submitted");
      localStorage.removeItem("currentQuest");
    } catch (error) {
      alert("Ошибка соединения с сервером");
    }
  };

  return (
    <div className={styles.container}>
      {
        <button className={styles.getTaskBtn} onClick={getRandomQuest}>
          {quest ? "Новое задание" : "Получить задание"}
        </button>
      }

      {quest && (
        <div className={styles.getTaskContainer}>
          <h2 className={styles.questTitle}>{quest.title}</h2>
          <p>{quest.description}</p>
          <p className={styles.badge}>Очки: {quest.points}</p>
          <p className={styles.badge}>Категория: {quest.category}</p>
          {!status && (
            <button className={styles.acceptBtn} onClick={acceptBtnClick}>
              Принять
            </button>
          )}
        </div>
      )}
      {status === "pending" && (
        <div className={styles.pendingContainer}>
          <p>Статус: на проверке</p>
          <label className={styles.choosefileBtn}>
            📎 Выбрать фото
            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              style={{ display: "none" }}
            />
          </label>

          {previewImg && (
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Отправить
            </button>
          )}
        </div>
      )}
      {status === "pending" && !previewImg && (
        <div className={styles.photoPlaceholder}>
          <p>вклей фото сюда</p>
        </div>
      )}
      {previewImg && (
        <div className={styles.photoPreview}>
          <img src={previewImg} alt="preview" />
        </div>
      )}
      {status === "submitted" && (
        <div className={styles.submittedStatus}>
          <p>Статус: отправлено</p>
        </div>
      )}
    </div>
  );
};

export default Home;
