import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import { BASE_URL } from '../utils';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData()
  const navigate = useNavigate();

  const navigation = useNavigation()

  const isSubmitting = navigation.state === "submitting"

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <div className={classes.formInputBox}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </div>
      <div className={classes.formInputBox}>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </div>
      <div className={classes.formInputBox}>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </div>
      <div className={classes.formInputBox}>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;


export const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData()

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }

  let url = `${BASE_URL}/events`;

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = `${BASE_URL}/events/${eventId}`;
  }

  const response = fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  })

  if (response.status === 422) {
    return response
  }

  if (!response.ok) {
    throw json({ message: "Could not create the event" }, { status: 500 })
  }


  return redirect('/events')

}
