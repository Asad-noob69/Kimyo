"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import WavePattern from "@/components/wave-pattern"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [, setHoveredIndex] = useState<number | null>(null)
  
  // Refs for text elements with proper HTML element types
  const welcomeTextRef = useRef<HTMLHeadingElement>(null)
  const portfolioTextRef = useRef<HTMLParagraphElement>(null)
  const loveTextRef = useRef<HTMLHeadingElement>(null)
  const japanTextRef = useRef<HTMLParagraphElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)
  const contactTitleRef = useRef<HTMLHeadingElement>(null)
  const contactDescRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Main timeline for initial animations
    const tl = gsap.timeline()

    // Welcome text animation
    tl.from(welcomeTextRef.current, {
      duration: 0.8,
      opacity: 0,
      y: 20,
      ease: "power3.out",
    })

    // Portfolio text animation
    if (portfolioTextRef.current) {
      const text = "WELCOME &nbsp; TO &nbsp; MY &nbsp; PORTFOLIO. &nbsp; JUST &nbsp; SOME &nbsp; PROJECTS &nbsp; DONE &nbsp; FOR &nbsp; FUN. &nbsp; HOPE &nbsp; YOU &nbsp; LIKE &nbsp; THESE!!"
      const words = text.split(" ")
      
      // Clear existing content
      while (portfolioTextRef.current.firstChild) {
        portfolioTextRef.current.removeChild(portfolioTextRef.current.firstChild)
      }

      // Create spans for each word
      words.forEach((word) => {
        const span = document.createElement("span")
        span.style.display = "inline-block"
        // Safely set HTML content
        span.innerHTML = word + " "
        portfolioTextRef.current?.appendChild(span)
      })

      tl.from(
        portfolioTextRef.current.children,
        {
          duration: 0.5,
          opacity: 0,
          y: 15,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      )
    }

    // Love text animation
    tl.from(
      loveTextRef.current,
      {
        duration: 0.7,
        opacity: 0,
        scale: 1.2,
        color: "#ff9d9d",
        ease: "elastic.out(1, 0.3)",
      },
      "-=0.2",
    )

    // Japan text animation
    tl.from(
      japanTextRef.current,
      {
        duration: 0.8,
        opacity: 0,
        x: -30,
        stagger: 0.03,
        ease: "power2.out",
      },
      "-=0.4",
    )

    // Scroll-triggered animations for contact section
    gsap.timeline({
      scrollTrigger: {
        trigger: contactSectionRef.current,
        start: "top center",
        toggleActions: "play none none none"
      }
    })
    .from(contactTitleRef.current, {
      duration: 0.6,
      opacity: 0,
      letterSpacing: "10px",
      ease: "power3.inOut",
    })
    .from(contactDescRef.current, {
      duration: 0.5,
      opacity: 0,
      y: 10,
      ease: "power2.out",
    }, "-=0.2")
    .from(".social-icon", {
      duration: 0.6,
      opacity: 0,
      scale: 0,
      rotation: -30,
      stagger: 0.1,
      ease: "back.out(2)",
    }, "-=0.3")

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <main className="min-h-screen p-4 bg-[#67262E]">
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Top Left Image */}
        <div
          className="
            shiny-border relative h-[200px] sm:h-[300px] md:aspect-video 
            rounded-lg overflow-visible shadow-md transition-all duration-300
            hover:scale-[1.02] hover:z-10
          "
          onMouseEnter={() => setHoveredIndex(0)}
        >
          <Image src="/images/blackbuck.png" alt="Product showcase" fill className="object-cover rounded-lg" priority />
        </div>

        {/* Top Right Image */}
        <div
          className="
            shiny-border relative h-[250px] sm:h-[350px] md:aspect-square 
            rounded-lg overflow-hidden shadow-md transition-all duration-300
            hover:scale-[1.02] hover:z-10
          "
          onMouseEnter={() => setHoveredIndex(1)}
        >
          <Image src="/images/lake.jpg" alt="Product display" fill className="object-cover" />
        </div>
        <div
          className="
              absolute right-10 top-8 
              w-[200px] h-full 
              bg-transparent p-4   
            "
        >
          <h1 ref={welcomeTextRef} className="text-sm text-white leading-7 mb-4 font-liber">
            HI!! WELCOME TO KIMYO
          </h1>
          <p ref={portfolioTextRef} className="text-sm sm:text-base mt-2 font-mono text-white leading-relaxed">
            WELCOME TO MY PORTFOLIO. IT&apos;S JUST SOME PROJECTS I&apos;VE DONE FOR FUN. HOPE YOU LIKE THESE!!
          </p>
        </div>

        {/* Center Circle */}
        <div
          className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full shadow-lg border-1 
                flex items-center justify-center z-10"
        >
          <Image src="/images/kimoyologo.jpg" alt="Logo" width={96} height={96} className="rounded-full object-cover" />
        </div>

        {/* Bottom Left Image */}
        <div className="flex gap-6">
          {/* Existing Image Div */}
          <div
            className="
              shiny-border relative h-[250px] sm:h-[350px] md:aspect-square 
              rounded-lg overflow-hidden shadow-md transition-all duration-300
              hover:scale-[1.02] hover:z-10
            "
            onMouseEnter={() => setHoveredIndex(2)}
          >
            <Image src="/images/japan.png" alt="Brand showcase" fill className="object-cover" />
          </div>

          {/* New Text Div */}
          <div className="w-[200px] sm:w-[250px] md:w-[280px] leading-relaxed text-gray-100">
            <h1 ref={loveTextRef} className="text-sm text-white leading-7 mb-4 font-liber mt-4">
              I LOVE WHAT I DO
            </h1>

            <p ref={japanTextRef} className="text-sm sm:text-base mt-2 font-mono">
              Japan is a country of rich traditions and technological advancements, where the ancient meets the modern.
              From breathtaking cherry blossoms in spring to bustling neon-lit streets in Tokyo, every corner of Japan
              tells a unique story. The culture is deeply rooted in respect,
            </p>
          </div>
        </div>

        {/* Bottom Right Image */}
        <div
          className="
            shiny-border relative h-[200px] sm:h-[300px] md:aspect-video 
            rounded-lg overflow-hidden shadow-md transition-all duration-300
            hover:scale-[1.02] hover:z-10
          "
          onMouseEnter={() => setHoveredIndex(3)}
        >
          <Image src="/images/mirage.jpg" alt="Product details" fill className="object-cover" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
          {/* Image Div - 50% Width */}
          <div
            className="shiny-border relative h-[200px] sm:h-[300px] md:w-4/5 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-[1.02] hover:z-10"
            onMouseEnter={() => setHoveredIndex(4)}
          >
            <Image src="/images/logo.jpg" alt="Shopping bag preview" fill className="object-cover" />
          </div>
        </div>

        {/* Contact Section with Scroll Trigger */}
        <div 
          ref={contactSectionRef} 
          className="flex-1 text-white flex flex-col items-center justify-center text-center"
        >
          <h2 ref={contactTitleRef} className="text-sm font-semibold font-liber tracking-wide">
            PlEASE CONTACT MEE HAHA
          </h2>
          <p ref={contactDescRef} className="text-sm mt-1 font-mono">
            Feel free to reach out through any platform:
          </p>

          {/* Icons with Links */}
          <div className="flex justify-center gap-4 mt-2 text-xl">
            <a href="mailto:your-email@example.com" className="hover:opacity-75 mt-0.5 social-icon">
              <Image src="/images/email.png" alt="Email" width={40} height={40} className="w-8 h-8" />
            </a>
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              className="hover:opacity-75 social-icon"
              rel="noreferrer"
            >
              <Image src="/images/insta.png" alt="Instagram" width={40} height={40} className="w-8 h-8" />
            </a>
            <a
              href="https://wa.me/yourphonenumber"
              target="_blank"
              className="hover:opacity-75 social-icon"
              rel="noreferrer"
            >
              <Image src="/images/whatsapp.png" alt="WhatsApp" width={40} height={40} className="w-9 h-9" />
            </a>
          </div>
        </div>
      </div>

      {/* Add the wave pattern at the bottom */}
      <div className="col-span-1 md:col-span-2 -mb-6">
        <WavePattern className="transform -translate-y-1" />
      </div>
    </main>
  )
}
