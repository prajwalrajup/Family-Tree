import Image from "next/image";
import styles from "./page.module.css";
import FamilyTree from "./components/FamilyTree";
import Layout from "./components/Layout";

const familyData = {
  people: {
    "1": {
      id: "1",
      name: "John Doe",
      gender: "MALE",
      spouse: "2",
      children: ["3", "4"],
      sourcePosition: "right",
    },
    "2": {
      id: "2",
      name: "Wife human",
      gender: "FEMALE",
      spouse: "1",
      children: ["3", "4"],
      sourcePosition: "left",
    },
    "3": {
      id: "3",
      name: "Alice Doe",
      gender: "FEMALE",
      parents: ["1", "2"],
      spouse: "5",
      children: ["6", "7"],
     
    },
    "4":{
      id: "4",
      name: "Bob Doe",
      gender: "MALE",
      parents: ["1", "2"],
      spouse: null,
      children: [],
    },
    "5":{
      id: "5",
      name: "Charlie Smith",
      gender: "MALE",
      spouse: "3",
      children: ["6", "7"],
    },
    "6":{
      id: "6",
      name: "Eva Smith",
      gender: "FEMALE",
      parents: ["3", "5"],
      spouse: null,
      children: [],
    },
    "7":{
      id: "7",
      name: "Frank Smith",
      gender: "MALE",
      parents: ["3", "5"],
      spouse: null,
      children: [],
    },
  },
};

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Family Tree</h1>
        {/* <FamilyTree data={familyData} /> */}
        <Layout data={familyData} />
      </div>

      {/* <div className={styles.center}>
      <FamilyTree data={familyData} />
      </div> */}
    </main>
  );
}
