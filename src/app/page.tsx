import Image from "next/image";

import ClientHomeView from "../components/client-view/home";
import ClientAboutView from "../components/client-view/about";
import ClientEducationView from "../components/client-view/education";
import ClientExperienceView from "../components/client-view/experience";
import ClientProjectView from "../components/client-view/project";
import ClientContactView from "../components/client-view/contact";

async function extractAllData(currentSection: string) {
  const res = await fetch(`http://localhost:3000/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();
  return data && data.data;
}

export default async function Home() {
  const homeSectionData = await extractAllData("home");
  const aboutSectionData = await extractAllData("about");
  const educationSectionData = await extractAllData("education");
  const experienceSectionData = await extractAllData("experience");
  const projectSectionData = await extractAllData("project");

  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView data={aboutSectionData} />
      <div
        className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
        id="education"
      >
        <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8">
          <ClientEducationView data={educationSectionData} />
          <ClientExperienceView data={experienceSectionData} />
        </div>
      </div>
      <ClientProjectView data={projectSectionData} />
      <ClientContactView />
    </div>
  );
}
