import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as manipulateEventAction } from "./components/EventForm"
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage"
import EventDetailPage, { loader as eventDetailLoader, action as eventDeleteAction } from "./pages/EventDetailPage"

import HomePage from "./pages/HomePage"
import EditEventPage from "./pages/EditEventPage"
import NewEventPage from "./pages/NewEventPage"
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import EventsRootLayout from "./pages/EventsRootLayout";
import NewsletterPage, { action as newsletterAction } from "./pages/NewsletterPage";


function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events", element: <EventsRootLayout />, children: [
            {
              index: true, element: <EventsPage />, loader: eventsLoader
            },
            {
              path: ":eventId", id: "event-detail", loader: eventDetailLoader, children: [
                { index: true, element: <EventDetailPage />, action: eventDeleteAction },
                { path: 'edit', element: <EditEventPage />, action: manipulateEventAction },
              ]
            },
            { path: 'new', element: <NewEventPage />, action: manipulateEventAction },
          ]
        },
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    }
  ])
  return <RouterProvider router={router} />
}

export default App;