
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ClientOnly from "../components/ClientOnly";
import ContactInformations from "../components/ContactInformation";
import Form from '../components/form'

export default function ClientSide() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Contact Information</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ClientOnly>
          <Form/>
          <ContactInformations />
        </ClientOnly>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}