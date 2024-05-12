import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { BASE_URL } from '../../utils';
import EventsList from '../../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData()

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>{(loadEvents) => <EventsList events={loadEvents} />}</Await>
    </Suspense>
  )
}

export default EventsPage;

const loadEvents = async () => {

  const response = await fetch(`${BASE_URL}/events`);

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 })
  } else {
    const resData = await response.json();
    return resData.events;
  }

}

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
}
