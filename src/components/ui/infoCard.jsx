import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import AICreativeMediaHackathon from "../im/AICreativeMediaHackathon.jpeg"


export default function infoCard() {
  return (
    <Card className="w-[350px] shadow-lg border bg-[#070b15] rounded-2xl overflow-hidden transition hover:scale-[1.02] duration-300">
      
      <img
        src={AICreativeMediaHackathon}
        alt="Event"
        className="w-full h-48 object-cover"
      />

      <CardHeader>
        <CardTitle>Tech Fest 2025</CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        <p className="mb-2">
          Participate in coding challenges, hands-on workshops, and interactive tech sessions.
        </p>
        <p className="text-xs text-gray-500">📅 July 15, 2025 | 🕒 10:00 AM - 5:00 PM</p>
      </CardContent>

      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}
