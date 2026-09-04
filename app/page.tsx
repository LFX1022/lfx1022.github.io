import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { AboutMe } from "@/components/sections/AboutMe";
import { MyJourney } from "@/components/sections/MyJourney";
import { LifeInterests } from "@/components/sections/LifeInterests";
import { MySetup } from "@/components/sections/MySetup";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { SelectedWorks, StoryArchives } from "@/components/sections/SelectedWorks";
import { Contact } from "@/components/sections/Contact";
import { Guestbook } from "@/components/sections/Guestbook";
import { approvedGuestbookEntries } from "@/data/guestbook";

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
        {/* 4. Records 工作紀錄 */}
        <WhatIDo />
        <SelectedWorks />
        {/* 5. Life & Interests 生活與興趣 */}
        <LifeInterests />
        {/* 圖鑑整理放在車庫與 600RR 內容之後 */}
        <StoryArchives />
        {/* 6. My Setup 我的電腦 */}
        <MySetup />
        <Guestbook entries={approvedGuestbookEntries} />
        {/* 10. Contact 聯絡方式 */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
