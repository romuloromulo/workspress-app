import TitleSection from "@/components/landing-page/title-section";
import Banner from "../../../public/appBanner.png";
import React from "react";

function HomePage() {
  return (
    <section>
      <div className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
        <TitleSection
          pill="Sua área de trabalho perfeita."
          title="Tudo em uma só plataforma produtiva e colaborativa."
          subheading=""
        />
      </div>
      <div className="bg-white p-[2px] mt-6 rounded-xl bg-gradient-to-r from-primary to-brand-primaryBlue sm:w-[300px]">
        <Button
          variant="btn-secondary"
          className=" w-full
            rounded-[10px]
            p-6
            text-2xl
            bg-background
          ">
          Use Workspress gratuitamente!
        </Button>
      </div>
      <div
        className="md:mt-[-90px]
          sm:w-full
          w-[750px]
          flex
          justify-center
          items-center
          mt-[-40px]
          relative
          sm:ml-0
          ml-[-50px]
        ">
        {" "}
        <Image src={Banner} alt="Application Banner" />
      </div>
    </section>
  );
}

export default HomePage;
