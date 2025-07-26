import React from "react";
import { ToSignUpButton } from "@/features/registration";
import { PairList } from "@/widgets/pair-list";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ShieldCheck, BarChartBig, Globe } from "lucide-react";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-bg2 flex flex-col items-center rounded-lg p-8 text-center">
    <div className="text-PrimaryYellow mb-4">{icon}</div>
    <h3 className="text-PrimaryText mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-SecondaryText">{description}</p>
  </div>
);

export default function Home() {
  return (
    <main className="bg-bg2 text-PrimaryText">
      {/* Hero Section */}
      <section className="bg-bg1 py-20 text-center md:py-32">
        <div className="wrapper">
          <h1 className="text-4xl leading-tight font-bold tracking-tighter md:text-6xl">
            Trade Crypto with Confidence on{" "}
            <span className="text-PrimaryYellow">Alpin Exchange</span>
          </h1>
          <p className="text-SecondaryText mx-auto mt-6 max-w-2xl text-lg">
            A secure, fast, and user-friendly platform for everyone. Join the
            future of finance today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <ToSignUpButton className="px-8 py-6 text-lg" />
            <Link href="/trade/BTCUSDT">
              <Button variant="secondary" className="px-8 py-6 text-lg">
                Start Trading
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="py-16 md:py-24">
        <div className="wrapper">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-3xl font-bold">
              Explore the Market
            </h2>
            <p className="text-SecondaryText mb-10 text-center">
              Stay updated with the latest market trends and prices.
            </p>
            <div className="border-Line bg-bg rounded-lg border p-4">
              <PairList />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-bg1 py-16 md:py-24">
        <div className="wrapper">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Choose Alpin Exchange?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<ShieldCheck size={48} />}
              title="Rock-Solid Security"
              description="Your assets are protected with industry-leading security measures and cold storage solutions."
            />
            <FeatureCard
              icon={<BarChartBig size={48} />}
              title="Advanced Trading Tools"
              description="Utilize our powerful charting tools and analytics to make informed trading decisions."
            />
            <FeatureCard
              icon={<Globe size={48} />}
              title="Global Access & Support"
              description="Trade 24/7 from anywhere in the world with our reliable platform and dedicated customer support."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 text-center md:py-32">
        <div className="wrapper">
          <h2 className="text-3xl font-bold">Ready to Start Trading?</h2>
          <p className="text-SecondaryText mx-auto mt-4 max-w-xl">
            Create an account in minutes and start your crypto journey with us.
          </p>
          <div className="mt-8">
            <ToSignUpButton className="px-10 py-6 text-xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
