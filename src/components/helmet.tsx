import type { CommonMeta, PageMeta } from "@/data/helmetData";

const Helmet = ({ page, common }: { page: PageMeta; common: CommonMeta }) => {
  return (
    <>
      <title>{page.title}</title>
      <meta name="description" content={page.desc} />
      <meta name="keywords" content={page.keys} />

      <meta name="robots" content={common.robots} />
      <meta name="charSet" content={common.charset} />

      <meta name="og:image" content={common.og.image} />
      <meta name="og:image:url" content={common.og.imageUrl} />
      <meta name="og:image:width" content={common.og.imageWidth} />
      <meta name="og:image:height" content={common.og.imageHeight} />
      <meta name="og:image:alt" content={common.og.imageAlt} />
      <meta name="og:description" content={page.desc} />
      <meta name="og:title" content={common.og.title} />
      <meta name="og:site_name" content={common.og.siteName} />

      <meta name="charSet" content={common.charset} />

      <meta name="apple-mobile-web-app-capable" content={common.apple} />
      <meta name="google" content={common.google} />
    </>
  );
};

export default Helmet;
