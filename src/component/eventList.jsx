import { Card, CardContent } from "@/components/ui/card";

const dummyEvents = [
  { id: 1, name: "Hackathon 2025", date: "2025-07-15" },
  { id: 2, name: "Tech Talk", date: "2025-07-20" }
];

export default function EventsList() {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Registered Events</h2>
      <div className="grid gap-4">
        {dummyEvents.map(event => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <h3 className="font-semibold">{event.name}</h3>
              <p className="text-sm text-gray-500">Date: {event.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
