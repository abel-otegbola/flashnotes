import { MedalRibbon, Microphone2, ChartSquare, Lightning, Magnet, CheckCircle, ArrowRight, UsersGroupRounded } from "@solar-icons/react"
import HeroCheckIcon from "../../../assets/icons/heroCheck"
import BlurReveal from "../../../components/animations/blurReveal"
import Button from "../../../components/button/button"

function Home() {
  return (
    <main className="w-full dark:bg-dark dark:text-gray-100">
      {/* Hero Section */}
      <header className="flex justify-center items-center flex-col gap-6 sm:rounded-[40px] md:p-[40px] p-4 py-[80px] md:mx-[32px]">
        <p className="flex items-center gap-2 text-gray dark:text-gray-200 text-[12px] border border-gray-500/[0.2] bg-white/[0.1] dark:bg-white/[0.05] w-fit px-2 py-1 pr-4 rounded-full">
          <MedalRibbon weight="BoldDuotone" color="#FF7700" />
          Powered by Google Gemini AI
        </p>

        <div>
          <BlurReveal preset="slide-left">
            <h1 className="md:text-[48px] text-[24px] font-bold w-fit text-center mx-auto leading-[120%]">
              Turn Meetings into Action
            </h1>
          </BlurReveal>
          <BlurReveal preset="slide-left">
            <h1 className="flex flex-wrap md:text-[48px] text-[24px] font-bold w-fit text-center gap-2 items-center mx-auto leading-[120%]">
              in a <HeroCheckIcon width={60} className="w-[20px]" /> ⚡Flash 
            </h1>
          </BlurReveal>
        </div>

        <BlurReveal preset="slide-left">
          <p className="text-gray dark:text-gray-300 text-center mx-auto md:w-[65%] w-full md:text-[18px]">
            Record meetings, speak your thoughts, and watch AI transform them into actionable tasks. 
            Identify bottlenecks, optimize workflows, and boost team productivity—all automatically.
          </p>
        </BlurReveal>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button href="/auth/waitlist">Start Free Trial</Button>
          <button className="px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 font-medium">
            Watch Demo
          </button>
        </div>

        <img src="/Tasks - create.png" width={729} height={529} alt="hero" className="shadow-2xl rounded-lg" />
        
        <div className="py-4 flex flex-col items-center gap-4 md:w-[55%] text-center mb-12">
          <BlurReveal preset="slide-right">
            <h2 className="md:text-[24px] text-[18px] font-medium">Join 500+ Teams Saving 10+ Hours/Week</h2>
          </BlurReveal>
          <BlurReveal preset="slide-right">
            <p className="dark:text-gray-300">Get early access, influence features, and unlock exclusive perks for early adopters</p>
          </BlurReveal>
          <img src="/users.png" alt="users" width={220} height={36} className="" />
          <Button href="/auth/waitlist">Join waitlist — It's Free</Button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="md:p-[80px] p-4 py-[60px] flex flex-col gap-12">
        <div className="text-center max-w-3xl mx-auto">
          <BlurReveal preset="slide-right">
            <span className="text-primary uppercase font-semibold tracking-wide text-[14px]">Features</span>
            <h2 className="md:text-[40px] text-[28px] font-bold mt-4 mb-6">
              Everything You Need to Work Smarter
            </h2>
            <p className="text-gray dark:text-gray-300 md:text-[18px]">
              From voice to action in seconds. AI-powered intelligence that actually understands your workflow.
            </p>
          </BlurReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: <Microphone2 size={32} className="text-primary" />,
              title: "Voice-to-Task Conversion",
              description: "Record meetings or speak directly. Our AI extracts tasks, assigns priorities, and sets deadlines automatically.",
              benefit: "Save 5+ hours per week on manual task entry"
            },
            {
              icon: <Lightning size={32} className="text-primary" />,
              title: "AI-Powered Summarization",
              description: "Google Gemini analyzes recordings and generates concise summaries with key action items and decisions.",
              benefit: "Never miss important details again"
            },
            {
              icon: <Magnet size={32} className="text-primary" />,
              title: "Lightning-Fast Search",
              description: "ElasticSearch integration lets you find any task, meeting note, or action item instantly across thousands of entries.",
              benefit: "Find anything in under 2 seconds"
            },
            {
              icon: <ChartSquare size={32} className="text-primary" />,
              title: "Productivity Analytics",
              description: "Track task completion rates, identify bottlenecks, and see real-time team productivity metrics.",
              benefit: "Boost team output by 30%"
            },
            {
              icon: <UsersGroupRounded size={32} className="text-primary" />,
              title: "Workflow Optimization",
              description: "AI analyzes communication patterns, meeting frequency, and workload distribution to suggest improvements.",
              benefit: "Eliminate 40% of unnecessary meetings"
            },
            {
              icon: <CheckCircle size={32} className="text-primary" />,
              title: "Smart Task Management",
              description: "Auto-categorize tasks, detect dependencies, and get intelligent recommendations for what to tackle next.",
              benefit: "Complete 25% more tasks per sprint"
            }
          ].map((feature, index) => (
            <BlurReveal key={index} preset="slide-right">
              <div className="p-6 rounded-2xl border border-border-gray-100 dark:border-gray-700 bg-bg-gray-100 dark:bg-dark-bg-secondary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-[20px] font-bold mb-3">{feature.title}</h3>
                <p className="text-gray dark:text-gray-300 mb-4">{feature.description}</p>
                <p className="text-[14px] text-primary font-medium">✓ {feature.benefit}</p>
              </div>
            </BlurReveal>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="md:p-[80px] p-4 py-[60px] bg-bg-gray-100 dark:bg-dark-bg/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <BlurReveal preset="slide-right">
              <span className="text-primary uppercase font-semibold tracking-wide text-[14px]">How It Works</span>
              <h2 className="md:text-[40px] text-[28px] font-bold mt-4 mb-6">
                From Chaos to Clarity in 3 Simple Steps
              </h2>
              <p className="text-gray dark:text-gray-300 md:text-[18px]">
                No complex setup. No learning curve. Just effortless productivity.
              </p>
            </BlurReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Record or Speak",
                description: "Upload meeting recordings or use voice input to capture your thoughts, discussions, and ideas naturally.",
                image: "placeholder"
              },
              {
                step: "02",
                title: "AI Processes Everything",
                description: "Google Gemini analyzes the content, identifies action items, extracts key insights, and structures everything intelligently.",
                image: "placeholder"
              },
              {
                step: "03",
                title: "Get Actionable Tasks",
                description: "Receive organized tasks with priorities, deadlines, and recommendations. Search, track, and optimize your workflow instantly.",
                image: "placeholder"
              }
            ].map((step, index) => (
              <BlurReveal key={index} preset="slide-up">
                <div className="flex flex-col gap-6">
                  <div className="text-primary font-bold text-[48px] opacity-20">{step.step}</div>
                  <div className="w-full h-[200px] bg-gradient-to-br from-primary/20 to-fuchsia-400/20 rounded-xl flex items-center justify-center border border-primary/30">
                    <span className="text-gray-400 text-[14px]">Visual: {step.title}</span>
                  </div>
                  <h3 className="text-[24px] font-bold">{step.title}</h3>
                  <p className="text-gray dark:text-gray-300">{step.description}</p>
                </div>
              </BlurReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="md:p-[80px] p-4 py-[60px]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <BlurReveal preset="slide-right">
              <span className="text-primary uppercase font-semibold tracking-wide text-[14px]">Pricing</span>
              <h2 className="md:text-[40px] text-[28px] font-bold mt-4 mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-gray dark:text-gray-300 md:text-[18px]">
                Start free, scale as you grow. No hidden fees, cancel anytime.
              </p>
            </BlurReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for individuals testing the waters",
                features: [
                  "Up to 10 hours of recording/month",
                  "Basic task conversion",
                  "7-day history",
                  "Email support",
                  "Core features access"
                ],
                cta: "Start Free",
                popular: false
              },
              {
                name: "Professional",
                price: "$29",
                period: "/user/month",
                description: "Best for growing teams who need more power",
                features: [
                  "Unlimited recordings",
                  "Advanced AI analytics",
                  "Unlimited history",
                  "Priority support",
                  "Workflow optimization insights",
                  "Team collaboration tools",
                  "Custom integrations"
                ],
                cta: "Start 14-Day Trial",
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large teams with advanced needs",
                features: [
                  "Everything in Professional",
                  "Dedicated account manager",
                  "Custom AI training",
                  "SLA guarantee",
                  "Advanced security & compliance",
                  "White-label options",
                  "API access"
                ],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, index) => (
              <BlurReveal key={index} preset="slide-right">
                <div className={`p-8 rounded-2xl border ${plan.popular ? 'border-primary shadow-2xl scale-105' : 'border-border-gray-100 dark:border-gray-700'} bg-white dark:bg-dark-bg-secondary/50 relative`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-[12px] font-semibold">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-[24px] font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-[40px] font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray dark:text-gray-300">{plan.period}</span>}
                  </div>
                  <p className="text-gray dark:text-gray-300 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-[14px]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="/auth/waitlist" className={`w-full justify-center ${plan.popular ? '' : 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white'}`}>
                    {plan.cta}
                  </Button>
                </div>
              </BlurReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="md:p-[80px] p-4 py-[60px] bg-bg-gray-100 dark:bg-dark-bg/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <BlurReveal preset="slide-right">
              <span className="text-primary uppercase font-semibold tracking-wide text-[14px]">Testimonials</span>
              <h2 className="md:text-[40px] text-[28px] font-bold mt-4 mb-6">
                Loved by Teams Worldwide
              </h2>
              <p className="text-gray dark:text-gray-300 md:text-[18px]">
                See how Flashtasks is transforming the way teams work
              </p>
            </BlurReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Flashtasks cut our meeting follow-up time by 80%. We now spend more time doing and less time documenting.",
                author: "Sarah Chen",
                role: "Product Manager",
                company: "TechFlow Inc.",
                avatar: "SC"
              },
              {
                quote: "The workflow analytics revealed bottlenecks we didn't even know existed. We've reduced our sprint cycle by 2 days.",
                author: "Marcus Johnson",
                role: "Engineering Lead",
                company: "DevCore",
                avatar: "MJ"
              },
              {
                quote: "Being able to search through months of meeting recordings instantly is a game-changer. Nothing gets lost anymore.",
                author: "Emily Rodriguez",
                role: "Operations Director",
                company: "Scalable Systems",
                avatar: "ER"
              }
            ].map((testimonial, index) => (
              <BlurReveal key={index} preset="slide-up">
                <div className="p-6 rounded-2xl bg-white dark:bg-dark-bg-secondary/50 border border-border-gray-100 dark:border-gray-700">
                  <div className="mb-4 text-primary text-[48px] leading-none">"</div>
                  <p className="text-gray dark:text-gray-300 mb-6 italic">{testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-fuchsia-400 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.author}</div>
                      <div className="text-[14px] text-gray dark:text-gray-400">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </BlurReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="md:p-[80px] p-4 py-[60px]">
        <BlurReveal preset="slide-right">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary to-fuchsia-400 rounded-3xl p-12 text-white">
            <h2 className="md:text-[40px] text-[28px] font-bold mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="md:text-[20px] text-[16px] mb-8 opacity-90">
              Join thousands of teams who've already made the switch. Start your free trial today—no credit card required.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Button href="/auth/waitlist" className="bg-white text-primary hover:bg-gray-100">
                Get Started Free <ArrowRight className="ml-2" />
              </Button>
              <button className="px-6 py-3 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-colors duration-300 font-medium">
                Schedule a Demo
              </button>
            </div>
            <p className="mt-6 text-[14px] opacity-75">✓ 14-day free trial ✓ No credit card required ✓ Cancel anytime</p>
          </div>
        </BlurReveal>
      </section>
    </main>
  )
}

export default Home
