import React from 'react'

const EventPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/events/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch event data')

    const { data } = await response.json();
    
    
  return (
    <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <p>{data.location}</p>
        <p>{data.time}</p>
    </div>
  )
}

export default EventPage