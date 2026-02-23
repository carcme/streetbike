export default function UmamiAnalytics() {
  const umamiSrc = import.meta.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiId = import.meta.env.NEXT_PUBLIC_UMAMI_ID;

  if (!umamiSrc || !umamiId) {
    console.error("Umami Analytics is not configured.");
    return null;
  }

  return (
    <script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id="7826bda7-710c-4963-ad38-97354e9a4d37"
    ></script>
  );
}
