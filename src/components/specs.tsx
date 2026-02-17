import { specs } from "@/data/basicStats";
import { Button } from "./ui/button";

const Specifications = () => {
  return (
    <section id="specs" className="pt-16 bg-background w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl text-primary mb-2">
            Technical Specifications
          </h2>
          <p className="text-muted-foreground">1984 BMW R65 - The boxer twin</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {specs.section.map((section) => {
            return (
              <div
                key={section.title}
                className="mechanical-border rounded-lg p-4 sm:p-8"
              >
                <h3 className="text-gold font-display text-lg mb-6 flex items-center gap-2 ">
                  <i data-lucide="settings" className="w-5 h-5"></i>
                  {section.title}
                </h3>
                <dl className="space-y-4">
                  {section.data.map((item) => {
                    return (
                      <div
                        key={item.label}
                        className="flex justify-between border-b border-white/10 pb-2"
                      >
                        <dt className="text-muted-foreground">{item.label}</dt>
                        <dd className="text-primary">{item.value}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            );
          })}
        </div>

        <div className="mt-8 mechanical-border rounded-lg p-4 xs:p-8 flex items-center justify-between gap-4 flex-wrap xs:flex-nowrap flex-col xs:flex-row">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full">
              <img src="/bmw.svg" alt="BMW Logo" className="size-12" />
            </div>
            <div>
              <p className="text-primary">Original Manual</p>
              <p className="text-gold text-sm">Factory service documentation</p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <a
              href="https://alteisentreiber.de/fleisspelz/Dokumente/BMW%20Werkstatthandbuch%20R45%20R65%20R65LS.pdf"
              target="_blank"
            >
              <Button
                variant={"link"}
                className=" text-white/80 bg-bmw-blue hover:bg-bmw-blue/80"
              >
                🇩🇪 Download
              </Button>
            </a>
            <a
              href="https://vintagebmw.org/library_data/Document_WorkshopManual_R45,_R65_English_1982_Airheads_BMW_601ad7b7668b8.pdf"
              target="_blank"
            >
              <Button
                variant={"link"}
                className=" text-white/80 bg-bmw-blue hover:bg-bmw-blue/80"
              >
                🇬🇧 Download
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specifications;
