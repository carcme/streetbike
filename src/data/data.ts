export type Step = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "find" | "strip" | "build" | "respray" | "finish";
  imageUrl: string;
};

export const steps: Step[] = [
  {
    id: "1",
    title: "The Shed Find",
    description:
      "Found this beauty gathering dust in an old shed. It had been sitting for 15 years. Mouse nests in the airbox, rusted chain, but the engine turned over.",
    date: "2023-04-15",
    category: "find",
    imageUrl: "shedbike.webp",
  },
  {
    id: "2",
    title: "Stripping it Down",
    description:
      "Day 1 of the tear down. Removing the fairings, tank, and seat. Labeling every bolt and wire. The frame looks straight, which is a huge relief.",
    date: "2023-04-20",
    category: "strip",
    imageUrl:
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "3",
    title: "Engine Rebuild",
    description:
      "Cracked the casing open. New gaskets, piston rings, and a thorough cleaning. Painted the block matte black for that stealth look.",
    date: "2023-05-10",
    category: "build",
    imageUrl:
      "https://images.unsplash.com/photo-1703181230250-c25802f3449b?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "4",
    title: "Custom Subframe",
    description:
      "Chopped the rear subframe to create the street fighter tail. Welding on new mounts for the custom seat unit.",
    date: "2023-06-05",
    category: "build",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "5",
    title: "Fresh Paint",
    description:
      "Frame powder coated in satin black. Tank and accents painted in a deep metallic grey with neon yellow pinstripes.",
    date: "2023-07-20",
    category: "build",
    imageUrl:
      "https://images.unsplash.com/photo-1758405170527-46daa0b9b528?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "6",
    title: "Final Assembly",
    description:
      "Putting it all back together. New wiring loom, LED headlight, digital dash, and performance exhaust fitted.",
    date: "2023-08-15",
    category: "build",
    imageUrl: "/concept.webp",
  },
  {
    id: "7",
    title: "The Street Fighter",
    description:
      "Finished. Dyno tuned and ready for the track. It screams. 160HP at the wheel and looks mean standing still.",
    date: "2023-09-01",
    category: "finish",
    imageUrl: "/final.webp",
  },
];
