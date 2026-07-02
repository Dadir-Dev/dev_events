import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({
  title,
  image,
  slug,
  location,
  date,
  time,
}: EventCardProps) => {
  return (
    <Link
      href={`/events/${slug}`}
      id="event-card"
      className="group rounded-[28px] border border-dark-200 bg-dark-100 p-4 shadow-none transition-transform duration-300 hover:-translate-y-1 hover:border-blue"
    >
      <div className="overflow-hidden rounded-3xl border border-transparent bg-dark-200 card-shadow transition-all duration-500 group-hover:border-blue">
        <Image
          className="poster transition duration-500 ease-out group-hover:scale-105"
          src={image}
          alt={title}
          width={410}
          height={410}
        />
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3 text-sm text-light-200 opacity-90">
          <div className="flex items-center gap-2">
            <Image src="/icons/pin.svg" alt="Location" width={14} height={14} />
            <p>{location}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/calendar.svg"
              alt="Date"
              width={14}
              height={14}
            />
            <p>{date}</p>
          </div>
        </div>

        <p className="title text-[22px] leading-tight text-white">{title}</p>

        <div className="datetime">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/icons/clock.svg" alt="Time" width={14} height={14} />
              <p>{time}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
