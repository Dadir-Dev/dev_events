import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  title: string;
  image: string;
}

const EventCard = ({ title, image }: EventCardProps) => {
  return (
    <Link href={`/events/${title}`}>
      <Image
        className="poster"
        src={image}
        alt={title}
        width={410}
        height={410}
      />
      <p className="title">{title}</p>
    </Link>
  );
};

export default EventCard;
