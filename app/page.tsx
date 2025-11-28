import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import React from "react";

const Page = () => {
  const events = [
    { image: "/images/event1.png", title: "event1" },
    { image: "/images/event2.png", title: "event2" },
  ];
  return (
    <section>
      <h1 className="text-center capitalize">
        The hub for every dev <br /> you cant miss
      </h1>
      <p className="text-center mt-5">
        Hackathon,Meetups and Conferences all in omne places
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
