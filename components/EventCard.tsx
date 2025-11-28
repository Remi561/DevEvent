import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
interface Props {
  id: number;
  name: string;
  description: string;
  location: string;
  time: string;
  image: string;
  slug: string;
}

const EventCard = ({
  name,
  image,
  slug,
  description,
  time,
  location,
}: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={name}
        width={410}
        height={300}
        className="poster"
      ></Image>

      <div className="flex flex-row gap-2">
        <Image src={"/icons/pin.svg"} alt="location" width={14} height={14} />
        <p>{location}</p>
      </div>
      <p className="title">{name}</p>
      <div className="datetime">
        <div className="flex flex-row gap-2">
          <Image
            src={"/icons/calendar.svg"}
            alt="date"
            width={14}
            height={14}
          />
          <p>{}</p>
        </div>

        <div className="flex flex-row gap-2">
          <Image src={"/icons/clock.svg"} alt="time" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard