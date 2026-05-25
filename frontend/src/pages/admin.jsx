import { useEffect, useState } from "react";
import styles from "./admin.module.css";

const Admin = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/submission`,
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

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/submission/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "одобрено" }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      setSubmissions((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: "одобрено" } : item
        )
      );
    } catch (error) {
      alert("Ошибка соединения с сервером");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/submission/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "отклонено" }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      setSubmissions((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: "отклонено" } : item
        )
      );
    } catch (error) {
      alert("Ошибка соединения с сервером");
    }
  };

  const getStatusLabel = (status) => {
    if (status === "pending") return "На проверке";
    if (status === "approved") return "Одобрено";
    if (status === "rejected") return "Отклонено";
    return status;
  };

  return (
    <div>
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
                  <p>Статус: {getStatusLabel(item.status)}</p>
                  <p>Дата: {item.date}</p>
                </div>
                {item.status === "pending" && (
                  <div className={styles.buttonsContainer}>
                    <button
                      className={styles.acceptBtn}
                      onClick={() => handleApprove(item._id)}
                    >
                      Одобрить
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => handleReject(item._id)}
                    >
                      Отклонить
                    </button>{" "}
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Admin;
