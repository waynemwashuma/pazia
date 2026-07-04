export const companyProfile = {
  name: "Pazia",
  label: "Film launch house",
  description:
    "Pazia stages red-carpet premieres, teaser drops, and press campaigns for films that need a world-class arrival.",
  heroStatement: "We do not release films. We stage their arrival.",
  heroCopy:
    "Pazia builds the night a film enters culture: premiere architecture, teaser timing, press choreography, and launch strategy tuned for opening-week momentum.",
  contactEmail: "concierge@pazia.example",
  contactPhone: "+1 (310) 555-0186",
  locations: ["Nairobi", "Mombasa", "Kisumu"],
} as const;

export const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/films", label: "Upcoming Launches" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceLines = [
  {
    title: "Premiere architecture",
    description:
      "Venue flow, arrival design, guest-list sequencing, and opening-night direction.",
  },
  {
    title: "Campaign timing",
    description:
      "Teaser drops, trailer windows, key-art rolls, and momentum planning from first whisper to final week.",
  },
  {
    title: "Press orchestration",
    description:
      "Embargo strategy, red-carpet press lines, editorial partnerships, and media-room delivery.",
  },
  {
    title: "Audience ignition",
    description:
      "Screening events, tastemaker outreach, and curated launch moments that turn awareness into attendance.",
  },
] as const;

export const companyPrinciples = [
  "A launch should feel inevitable, not improvised.",
  "Every beat must sharpen the film’s identity.",
  "Spectacle earns its place when strategy is doing the work beneath it.",
] as const;

export const launchArc = [
  {
    title: "Tease the first image",
    description:
      "A controlled opening signal that gives the film a silhouette before the campaign speaks in full.",
  },
  {
    title: "Invite the room",
    description:
      "Press, tastemakers, and partners enter on purpose, with sequencing that protects the headline moment.",
  },
  {
    title: "Open the night",
    description:
      "Premiere direction, arrival rhythm, and audience flow designed around the film’s own tone.",
  },
  {
    title: "Sustain the afterglow",
    description:
      "Follow-through across editorial, social, and screening touchpoints so the launch outlives the carpet.",
  },
] as const;

export const interestOptions = [
  "Premiere launch strategy",
  "Teaser and trailer rollout",
  "Press and publicity",
  "Screening series",
  "Partnership enquiry",
] as const;
