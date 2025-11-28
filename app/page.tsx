import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import React from "react";
import { events } from "@/lib/constant";

const Page = () => {
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
          {events.map((event) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
