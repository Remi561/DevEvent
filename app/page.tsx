import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import React from "react";
import { Event } from "../types/event";

const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
const Page = async () => {
  const response = await fetch(`${hostname}/api/events`);

  if (!response.ok) throw new Error("something went wrong");

  const { data } = await response.json();

  return (
    <section>
      <h1 className="text-center capitalize">
        The hub for every dev <br /> you can&apos;t miss
      </h1>
      <p className="text-center mt-5">
        Hackathon,Meetups and Conferences all in one places
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Event</h3>

        <ul className="events">
          {data && data?.length > 0 ? (
            data.map((event: Event) => (
              <li key={event.id} className="list-none">
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <p>No events found</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Page;
