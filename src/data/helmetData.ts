export interface TwitterMeta {
  card: string;
  image: string;
  imageAlt: string;
}

export interface OpenGraphMeta {
  title: string;
  siteName: string;
  image: string;
  imageUrl: string;
  imageWidth: string;
  imageHeight: string;
  imageAlt: string;
  desc: string;
}

export interface CommonMeta {
  twitter: TwitterMeta;
  og: OpenGraphMeta;
  charset: string;
  robots: string;
  google: string;
  apple: string;
}

export interface PageMeta {
  title: string;
  desc: string;
  keys: string;
}

export interface HelmetData {
  home: PageMeta;
  common: CommonMeta;
  // If you add more pages later, you can add them here:
  // gallery?: PageMeta;
}

const helmetData: HelmetData = {
  home: {
    title: "Project R65 | BMW R65 Custom Build & Restoration",
    desc: "Follow the journey of restoring and customizing a classic BMW R65 motorcycle. Detailed build logs, technical specs, and a high-quality gallery of the Street Fighter project",
    keys: "BMW R65, custom motorcycle, cafe racer, street fighter, motorcycle restoration, BMW motorcycle build, R65 restoration",
  },
  common: {
    twitter: {
      card: "summary",
      image: "/concept.jpeg",
      imageAlt: "[Translate to English:]",
    },
    og: {
      title: "Home",
      siteName: "Project R65",
      image: "/concept.jpeg",
      imageUrl: "/concept.jpeg",
      imageWidth: "668",
      imageHeight: "350",
      imageAlt: "[Translate to English:]",
      desc: "Follow the journey of restoring and customizing a classic BMW R65 motorcycle. Detailed build logs, technical specs, and a high-quality gallery of the Street Fighter project",
    },
    charset: "utf-8",
    robots: "index, follow, max-image-preview:large",
    google: "",
    apple: "no",
  },
};

export default helmetData;
