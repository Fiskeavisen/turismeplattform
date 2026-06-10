import {
  Anchor,
  Fish,
  HeartHandshake,
  Landmark,
  Leaf,
  MapPin,
  Mountain,
  Sailboat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const activityIcons: Record<string, LucideIcon> = {
  "rib-safari": Fish,
  kayak: Sailboat,
  "mountain-hike": Mountain,
  "food-night": Landmark,
};

export const fallbackActivityIcon = MapPin;

export const uspItems: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Anchor, title: "Enkel booking", text: "Se ledighet og book på under ett minutt." },
  { icon: Sailboat, title: "Båt inkludert", text: "Egen motorbåt kan legges til oppholdet." },
  { icon: HeartHandshake, title: "Personlig service", text: "Lokalt vertskap som kjenner kysten." },
  { icon: Leaf, title: "Naturen i fokus", text: "Hav, skog og fjell rett utenfor døra." },
];
