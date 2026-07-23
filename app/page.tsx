import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { AboutMe } from "@/components/sections/AboutMe";
import { MyJourney } from "@/components/sections/MyJourney";
import { PersonalityOutlook } from "@/components/sections/PersonalityOutlook";
import { LifeInterests } from "@/components/sections/LifeInterests";
import { MySetup } from "@/components/sections/MySetup";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero 首頁主視覺 */}
        <Hero />
        {/* 2. About Me 關於我 */}
        <AboutMe />
        {/* 3. My Journey 我的經歷 */}
        <MyJourney />
        {/* 4. Personality & Outlook 個性與展望 */}
        <PersonalityOutlook />
        {/* 5. Life & Interests 生活與興趣 */}
        <LifeInterests />
        {/* 6. My Setup 我的電腦 */}
        <MySetup />
        {/* 7. What I Do 目前在做的事 */}
        <WhatIDo />
        {/* 8. Selected Works & Stories 作品與紀錄 */}
        <SelectedWorks />
        {/* 9. Contact 聯絡方式 */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
