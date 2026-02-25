import { specs } from "@/data/basicStats";
import { Button } from "./ui/button";
import { Image } from "@lonik/oh-image/react";

const Specifications = () => {
  return (
    <section id="specs" className="w-full pt-16 bg-background">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-4xl text-primary">
            Technical Specifications
          </h2>
          <p className="text-muted-foreground">1984 BMW R65 - The boxer twin</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {specs.section.map((section) => {
            return (
              <div
                key={section.title}
                className="p-4 rounded-lg mechanical-border sm:p-8"
              >
                <h3 className="flex items-center gap-2 mb-6 text-lg text-primary font-display ">
                  <i data-lucide="settings" className="w-5 h-5"></i>
                  {section.title}
                </h3>
                <dl className="space-y-4">
                  {section.data.map((item) => {
                    return (
                      <div
                        key={item.label}
                        className="flex justify-between pb-2 border-b border-white/10"
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

        <div className="flex flex-col flex-wrap items-center justify-between gap-4 p-4 mt-8 rounded-lg mechanical-border xs:p-8 xs:flex-nowrap xs:flex-row">
          <div className="flex items-start gap-4">
            <div className="rounded-full size-12">
              <Image
                fill={true}
                src="/bmw.svg"
                alt="BMW Logo"
                className="size-12"
              />
            </div>
            <div>
              <p className="text-primary">Original Manual</p>
              <p className="text-sm text-primary">
                Factory service documentation
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <a
              href="https://alteisentreiber.de/fleisspelz/Dokumente/BMW%20Werkstatthandbuch%20R45%20R65%20R65LS.pdf"
              target="_blank"
            >
              <Button
                variant={"link"}
                className="text-white bg-bmw-blue hover:bg-bmw-blue/80"
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
                className="text-white bg-bmw-blue hover:bg-bmw-blue/80"
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
