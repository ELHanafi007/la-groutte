"use client";
import {FC} from "react";
import Image from "next/image";

// Types
interface iCardItem {
	title: string;
	description: string;
	tag: string;
	src: string;
	link: string;
	color: string;
	textColor: string;
}

interface iCardProps extends Omit<iCardItem, "src" | "link" | "tag"> {
	i: number;
	src: string;
}

// Components
const Card: FC<iCardProps> = ({
	title,
	description,
	color,
	textColor,
	i,
	src,
}) => {
	return (
		<div className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-4">
			<div
				className="relative flex flex-col h-[400px] w-full max-w-[800px] py-12 px-10 md:px-12
				rotate-0 md:h-[500px] items-center justify-center mx-auto 
				shadow-premium-lg rounded-3xl overflow-hidden glass border border-white/[0.08]"
				style={{backgroundColor: color}}
			>
				<span className="font-bold relative text-4xl md:text-6xl mt-5 z-10 text-center drop-shadow-lg">
					<span
						className="relative z-10 font-heading tracking-tight"
						style={{color: textColor}}
					>
						{title}
					</span>
				</span>
				<div
					className="font-sans text-sm md:text-lg font-medium text-center mb-0 z-10 mt-4 tracking-wide max-w-lg drop-shadow-md"
					style={{lineHeight: 1.6, color: textColor}}
				>
					{description}
				</div>
				<div className="absolute inset-0 z-0 opacity-80">
					<Image
						className="w-full h-full object-cover"
						src={src}
						alt="Background"
						layout="fill"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.005_250)] via-[oklch(0.06_0.005_250/50%)] to-transparent" />
				</div>
			</div>
		</div>
	);
};

/**
 * CardSlide component displays a series of cards in a vertical scroll layout
 * Each card contains a title, description, and decorative elements
 */
interface iCardSlideProps {
	items: iCardItem[];
}

const CardsParallax: FC<iCardSlideProps> = ({items}) => {
	return (
		<div className="min-h-screen">
			{items.map((project, i) => {
				return <Card key={`p_${i}`} {...project} i={i} />;
			})}
		</div>
	);
};

export {CardsParallax, type iCardItem};
