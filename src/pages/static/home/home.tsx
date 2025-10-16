import { MedalRibbon } from "@solar-icons/react"
import HeroCheckIcon from "../../../assets/icons/heroCheck"
import BlurReveal from "../../../components/animations/blurReveal"
import Button from "../../../components/button/button"

function Home() {
  return (
    <main className="w-full">
      <header className="flex justify-center items-center flex-col gap-6 sm:rounded-[40px] md:p-[40px] p-4 py-[80px] md:mx-[32px] bg-[url('/bg-hero.png')] bg-top bg-cover">
        <p className="flex items-center gap-2 text-gray text-[12px] border border-gray-200 bg-white/[0.5] w-fit px-2 py-1 pr-4 rounded-full">
          <MedalRibbon weight="BoldDuotone" color="#FF7700" />
          Instant structure for busy thinkers
        </p>

        <div>
          <BlurReveal preset="slide-left">
            <h1 className="md:text-[48px] text-[24px] font-bold w-fit text-center mx-auto leading-[120%]">
              Convert Your Thoughts into 
            </h1>
          </BlurReveal>
          <BlurReveal preset="slide-left">
            <h1 className="flex flex-wrap md:text-[48px] text-[24px] font-bold w-fit text-center gap-2 items-center mx-auto leading-[120%]">
              Flow <HeroCheckIcon width={60} className="w-[20px]" /> in a ⚡Flash 
            </h1>
          </BlurReveal>
        </div>

        <BlurReveal preset="slide-left">
          <p className="text-gray text-center mx-auto md:w-[65%] w-full">Say what you want to do and flashtasks turn it into a structured plan, complete with tasks, milestones, and insights that keep you focused.</p>
        </BlurReveal>
        <Button href="/auth/waitlist">Join waitlist</Button>

        <img src="/Tasks - create.png" width={729} height={529} alt="hero" className="" />
        
        <div className="py-4 flex flex-col items-center gap-4 md:w-[55%] text-center mb-12">
          <BlurReveal preset="slide-right">
            <h2 className="md:text-[24px] text-[18px] font-medium">Join the waitlist</h2>
          </BlurReveal>
          <BlurReveal preset="slide-right">
            <p>Be Among the first to Get early access before launch, Shape product features with feedback, Unlock exclusive early-user perks</p>
          </BlurReveal>
          <img src="/users.png" alt="users" width={220} height={36} className="" />
          <Button href="/auth/waitlist">Join waitlist</Button>
        </div>
      </header>

      {/* <section className="md:p-[32px] p-4 flex flex-col">
        <div className="md:text-center">
          <h1 className="text-primary uppercase font-medium">Why flashtasks?</h1>
          <p className="md:text-[24px] text-[16px] font-medium">Just tell it what’s on your mind. AI handles the rest</p>
        </div>
      </section> */}
    </main>
  )
}

export default Home