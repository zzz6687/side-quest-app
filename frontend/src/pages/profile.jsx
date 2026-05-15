import { useEffect, useState } from "react";
import styles from "./profile.module.css";

const Profile = () => {
  const [submissions, setSubmissions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/submission/my?userId=${
            user._id
          }`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }
        setSubmissions(data);
      } catch (error) {
        alert("Ошибка соединения с сервером");
      }
    };
    fetchSubmissions();
  }, []);

  const totalPoints = submissions
    .filter((item) => item.status === "approved")
    .reduce((sum, item) => sum + item.quest.points, 0);

  const getLevel = () => {
    if (totalPoints >= 200) return { title: "Легенда" };
    if (totalPoints >= 150) return { title: "Мастер" };
    if (totalPoints >= 100) return { title: "Опытный" };
    if (totalPoints >= 50) return { title: "Искатель" };
    return { title: "Новичок" };
  };

  return (
    <>
      <div className={styles.profileHeader}>
        <p className={styles.username}>{user.username}</p>
        <span className={styles.levelBadge}>{getLevel().title}</span>
      </div>
      <div className={styles.pointsRow}>
        <span className={styles.pointsLabel}>очки</span>
        <span className={styles.pointsValue}>{totalPoints}</span>
      </div>
      <div className={styles.container}>
        {submissions.map(
          (item, index) =>
            item.quest && (
              <div className={styles.card} key={index}>
                {item.image && (
                  <img
                    className={styles.cardPhoto}
                    src={item.image}
                    alt="preview"
                  />
                )}
                <div className={styles.cardInfo}>
                  <p>Задание: {item.quest.title}</p>
                  <p>Очки: {item.quest.points}</p>
                  <p>Статус: {item.status}</p>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Profile;
