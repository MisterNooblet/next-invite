import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { IEvent } from './api/models/event';
import NewEvent from './components/NewEvent';

const inter = Inter({ subsets: ['latin'] });

interface EventResponse extends IEvent {
  id: string;
}

export default function Home({ events }: { events: EventResponse[] }) {
  return (
    <>
      <Head>
        <title>Next Invite App</title>
        <meta name="description" content="Invite your attendees" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>Next Invite App</h1>
        {events?.map((event) => (
          <div key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>{event.date.toString()}</p>
            <p>{event.location}</p>
          </div>
        ))}
        <NewEvent />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch('http://localhost:3000/api/events');
    const data = await response.json();
    return {
      props: { events: data },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { events: [] },
    };
  }
}