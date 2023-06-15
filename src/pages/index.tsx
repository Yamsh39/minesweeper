import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hoge} />
        <h1 className={styles.title}>Welcome to Next.js!</h1>
      </main>
    </div>
  );
};

export default Home;
