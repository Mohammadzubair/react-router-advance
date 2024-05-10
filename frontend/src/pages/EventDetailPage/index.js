import { json, useRouteLoaderData, } from 'react-router-dom'
import { BASE_URL } from '../../utils'
import EventItem from '../../components/EventItem'

const EventDetailPage = () => {
  const eventData = useRouteLoaderData('event-detail')

  return (
    <EventItem event={eventData.event} />
  )
}

export default EventDetailPage

export const loader = async ({ request, params }) => {
  const id = params.eventId;

  const response = await fetch(`${BASE_URL}/events/${id}`);

  if (response.ok) {
    return response;
  } else {
    throw json({ message: "Could not fetch details for the selected event." }, { status: 500 });
  }
}