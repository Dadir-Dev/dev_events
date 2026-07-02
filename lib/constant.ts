export interface EventItem {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    title: "Next.js Conf 2026",
    image: "/images/event1.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA",
    date: "August 14-16, 2026",
    time: "9:00 AM – 5:00 PM PDT",
  },
  {
    title: "React Summit EU",
    image: "/images/event2.png",
    slug: "react-summit-eu-2026",
    location: "Amsterdam, Netherlands",
    date: "September 21-22, 2026",
    time: "10:00 AM – 6:00 PM CEST",
  },
  {
    title: "GraphQL Galaxy",
    image: "/images/event3.png",
    slug: "graphql-galaxy-2026",
    location: "New York, NY",
    date: "October 5, 2026",
    time: "11:30 AM – 4:30 PM EDT",
  },
  {
    title: "AI Hack Week",
    image: "/images/event4.png",
    slug: "ai-hack-week-2026",
    location: "Austin, TX",
    date: "November 10-13, 2026",
    time: "All day",
  },
  {
    title: "Jamstack Conf",
    image: "/images/event5.png",
    slug: "jamstack-conf-2026",
    location: "Seattle, WA",
    date: "December 2-3, 2026",
    time: "9:30 AM – 5:30 PM PST",
  },
  {
    title: "DevOps Days London",
    image: "/images/event6.png",
    slug: "devops-days-london-2026",
    location: "London, UK",
    date: "November 18, 2026",
    time: "8:45 AM – 4:00 PM GMT",
  },
];
