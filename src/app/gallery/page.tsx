"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CardsParallax, type iCardItem } from "@/components/ui/scroll-cards";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const cardItems: iCardItem[] = [
	{
		title: "L'Atmosphère",
		description: "Une ambiance tamisée, des alcôves privées, un design taillé dans la roche avec notre signature lumineuse crimson et or.",
		tag: "design",
		src: "/about-grotto.png",
		link: "#",
		color: "transparent",
		textColor: "white",
	},
	{
		title: "Les Soirées DJ",
		description: "Des line-ups exclusifs avec les meilleurs DJs de la région pour enflammer la piste jusqu'au bout de la nuit.",
		src: "/event-dj.png",
		tag: "music",
		link: "#",
		color: "transparent",
		textColor: "white",
	},
	{
		title: "Performances Live",
		description: "Vibrez au son de nos groupes en live, une expérience acoustique unique dans l'écrin de La Grotte.",
		src: "/event-live.png",
		tag: "live",
		link: "#",
		color: "transparent",
		textColor: "white",
	},
	{
		title: "Nuits d'Exception",
		description: "Service premium, tables VIP, accès rapide grâce au scan QR, et instants inoubliables entre amis.",
		src: "/event-ladies.png",
		tag: "vip",
		link: "#",
		color: "transparent",
		textColor: "white",
	},
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full opacity-20 blur-[100px]" style={{ background: "oklch(0.55 0.22 18)" }} />
      <div className="pointer-events-none absolute top-40 -right-40 h-96 w-96 rounded-full opacity-10 blur-[100px]" style={{ background: "oklch(0.75 0.14 75)" }} />

      <Container>
        <SectionHeading
          badge="Galerie"
          title="Découvrez La Grotte"
          subtitle="Plongez dans l'univers de notre club. Une expérience visuelle et sonore avant même d'y entrer."
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-8 mb-12"
        >
          <div className="animate-bounce p-3 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.div>
      </Container>
      
      <div className="w-full">
        <CardsParallax items={cardItems} />
      </div>
    </div>
  );
}
