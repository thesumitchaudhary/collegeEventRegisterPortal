import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {Link, useNavigate} from "react-router-dom";


export default function infoCard({title, description, date, time, image_url,slug}) {
  const navigate = useNavigate();

  const redirectPage = () =>{
    navigate(`/event/${slug}`)
  }

  return (
    <Card className="w-[350px] shadow-lg border bg-[#070b15] rounded-2xl overflow-hidden transition hover:scale-[1.02] duration-300">
      
      <img
        src={image_url}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        <p className="mb-2">
          {description}
        </p>
        <p className="text-xs text-gray-500">📅 {date} | 🕒 {time}</p>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={redirectPage}>Register Now</Button>
      </CardFooter>
    </Card>
  );
}
