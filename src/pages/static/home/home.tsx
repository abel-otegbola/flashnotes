import { MedalRibbon } from "@solar-icons/react"
import HeroCheckIcon from "../../../assets/icons/heroCheck"
import BlurReveal from "../../../components/animations/blurReveal"
import Button from "../../../components/button/button"

function Home() {
  return (
    <main className="w-full">
      <header className="flex justify-center items-center flex-col gap-6 sm:rounded-[40px] md:p-[40px] p-4 py-[80px] md:mx-[32px] bg-[url('/bg-hero.png')] bg-top bg-cover">
        <p className="flex items-center gap-2 text-gray text-[12px] border border-gray-100 w-fit px-2 py-1 pr-4 rounded-full">
          <MedalRibbon weight="BoldDuotone" color="#FF7700" />
          Upload. Generate. Ace
        </p>

        <div>
          <BlurReveal duration={3}>
            <h1 className="md:text-[48px] text-[28px] font-bold w-fit text-center mx-auto leading-[120%]">
              Convert Notes into Smart
            </h1>
          </BlurReveal>
          <BlurReveal duration={3}>
            <h1 className="flex flex-wrap md:text-[48px] text-[28px] font-bold w-fit text-center gap-4 items-center mx-auto leading-[120%]">
              Flashcards <HeroCheckIcon />  Instantly
            </h1>
          </BlurReveal>
        </div>

        <BlurReveal duration={3}>
          <p className="text-gray text-center mx-auto md:w-[75%] w-full">Paste your lecture notes, pdfs, or meeting transcripts and get smart flashcards in seconds.</p>
        </BlurReveal>
        <Button>Join waitlist</Button>

        <img src="/hero-img.png" width={729} height={529} alt="hero" className="" />
        
        <div className="py-4 flex flex-col items-center gap-4">
          <BlurReveal preset="slide-right">
            <p>Join over 10+ users</p>
          </BlurReveal>
          <img src="/users.png" alt="users" width={220} height={36} className="" />
        </div>
      </header>

      <section className="md:p-[32px] p-4 flex flex-col">
        <div className="md:text-center">
          <h1 className="text-primary uppercase font-medium">Why flashnotes?</h1>
          <p className="md:text-[24px] text-[16px] font-medium">Because remembering shouldn’t be harder than learning</p>
        </div>
      </section>
    </main>
  )
}

export default Home