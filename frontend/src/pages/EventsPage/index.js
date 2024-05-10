import { useLoaderData, json } from 'react-router-dom';
import { BASE_URL } from '../../utils';
import EventsList from '../../components/EventsList';

function EventsPage() {
  const data = useLoaderData()

  const eventsData = data.events;

  return <EventsList events={eventsData} />
}

export default EventsPage;


export const loader = async () => {
  const response = await fetch(`${BASE_URL}/events`);

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 })
  } else {
    return response;
  }

}
