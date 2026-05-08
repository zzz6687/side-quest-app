import { useNavigate } from "react-router-dom";
import styles from "./landingPage.module.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={styles.landing}>
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>
          случайные задания для реальной жизни
        </div>
        <h1 className={styles.heroTitle}>
          Не знаешь,
          <br />
          <em>чем заняться?</em>
        </h1>
        <p className={styles.heroSub}>
          Получи случайное задание, выполни его и докажи фотографией.
          Зарабатывай очки и открывай новые стороны жизни.
        </p>
        <div className={styles.heroButtons}>
          <button
            className={styles.btnPrimary}
            onClick={() => navigate(user ? "/home" : "/login")}
          >
            Получить задание
          </button>
        </div>
      </section>

      <section className={styles.howSection}>
        <div className={styles.sectionLabel}>как это работает</div>
        <h2 className={styles.sectionTitle}>Три простых шага</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepIcon}>🎲</div>
            <h3>Получи задание</h3>
            <p>Нажми кнопку и получи случайный квест из нашей базы</p>
          </div>
          <div className={styles.stepLine} />
          <div className={styles.step}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepIcon}>📸</div>
            <h3>Выполни и сфотографируй</h3>
            <p>Сделай задание и загрузи фото как доказательство</p>
          </div>
          <div className={styles.stepLine} />
          <div className={styles.step}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepIcon}>⭐</div>
            <h3>Получи очки</h3>
            <p>
              После проверки администратором очки начисляются на твой профиль
            </p>
          </div>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className={styles.sectionLabel}>категории заданий</div>
        <h2 className={styles.sectionTitle}>На любой вкус</h2>
        <div className={styles.categoriesGrid}>
          <div className={`${styles.catCard} ${styles.catCardOutdoor}`}>
            <div className={styles.catIcon}>🌿</div>
            <h3>Outdoor</h3>
            <p>Прогулки, спорт, природа, городские приключения</p>
            <div className={styles.catPoints}>до 25 очков</div>
          </div>
          <div className={`${styles.catCard} ${styles.catCardIndoor}`}>
            <div className={styles.catIcon}>🏠</div>
            <h3>Indoor</h3>
            <p>Творчество, кулинария, саморазвитие, уют дома</p>
            <div className={styles.catPoints}>до 20 очков</div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>✦ Side Quest App — разнообразь свою жизнь ✦</span>
      </footer>
    </div>
  );
}
