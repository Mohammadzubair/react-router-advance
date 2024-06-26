import { Suspense } from 'react'
import { Await, defer, json, redirect, useRouteLoaderData, } from 'react-router-dom'
import { BASE_URL } from '../../utils'
import EventItem from '../../components/EventItem'
import EventsList from '../../components/EventsList'

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData('event-detail')

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {loadedEvent => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {loadedEvents => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetailPage

const loadEvent = async (id) => {
  const response = await fetch(`${BASE_URL}/events/${id}`);

  if (!response.ok) {
    throw json({ message: "Could not fetch details for the selected event." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }

}

const loadEvents = async () => {

  const response = await fetch(`${BASE_URL}/events`);

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 })
  } else {
    const resData = await response.json();
    return resData.events;
  }

}


export const loader = async ({ request, params }) => {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents()
  })
}

export const action = async ({ params, request }) => {
  const eventId = params.eventId;
  const response = await fetch(`${BASE_URL}/events/${eventId}`, { method: request.method })

  if (!response.ok) {
    throw json({ message: "Could not delete the event." }, { status: 500 });
  }

  return redirect('/events')
}