import styles from "./page.module.css";
import Layout from "./components/Layout";

import familyData from "./../public/data.json";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>{familyData.name}</h1>
      <Layout data={familyData} />
    </main>
  );
}
