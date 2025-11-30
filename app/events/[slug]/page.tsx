import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import BookEvent from "@/components/BookEvent";
import { Event } from "@/types/event";
import EventCard from "@/components/EventCard";
import { getSimilarEventsAction } from "@/lib/actions/event.actions";

const hostName = process.env.NEXT_PUBLIC_HOSTNAME;
interface AgendaItem {
  time: string;
  desc: string;
}
const EventDetailsItems = ({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex-row-gap-2">
      <Image src={src} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agenda }: { agenda: AgendaItem[] }) => {
  return (
    <ul className="list-disc list-inside">
      {agenda.map((item, index) => (
        <li key={index}>
          <strong>{item.time}</strong>: {item.desc}
        </li>
      ))}
    </ul>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row flex-wrap gap-1.5">
      {tags.map((tag, index) => (
        <div className="pill" key={index}>
          {tag}
        </div>
      ))}
    </div>
  );
};

const EventPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const similarEvents = await getSimilarEventsAction(slug);
  const request = await fetch(`${hostName}/api/events/${slug}`);
  let data;

  try {
    if (!request.ok) {
      if (request.status === 404) {
        return notFound();
      }
      throw new Error(`error just occured ${request.statusText}`);
    }
    const response = await request.json();
    data = response.data;

    if (!data) return notFound();
  } catch (e) {
    console.error(e);
    return notFound();
  }
  const booking = 10;
  return (
    <section id="event">
      <div className="header">
        <h1>Event description</h1>
        <p className="mt-2">{data.description}</p>
      </div>
      <div className="details">
        <div className="content">
          <Image
            src={data.image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{data.overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailsItems
              src={"/icons/calendar.svg"}
              alt="date"
              label={data.date}
            />
            <EventDetailsItems
              src={"/icons/clock.svg"}
              alt="time"
              label={data.time}
            />
            <EventDetailsItems
              src={"/icons/pin.svg"}
              alt="location"
              label={data.location}
            />

            <EventDetailsItems
              src={"/icons/mode.svg"}
              alt="mode"
              label={data.mode}
            />
            <EventDetailsItems
              src={"/icons/audience.svg"}
              alt="audience"
              label={data.audience}
            />
          </section>

          <section className="flex-col-gap-2">
            <h2>Agenda</h2>
            <EventAgenda agenda={data.agenda} />
          </section>
          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{data.organizer}</p>
          </section>
          <EventTags tags={data.tags} />
        </div>

        {/*Right side - Booking form*/}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book your spot</h2>
            {booking > 0 ? (
              <p className="text-sm">
                Join {booking} people who have already booked their spot !
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot </p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        {/* Similar Events Section */}
        <h2 className="text-2xl font-bold">Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 ? (
            similarEvents.map((event) => (
              <EventCard
                key={event.slug}
                {...event}
                agenda={
                  Array.isArray(event.agenda) ? (event.agenda as string[]) : []
                }
              />
            ))
          ) : (
            <p>No similar events found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventPage;
