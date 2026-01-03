import { Map, Calendar, Wallet, Share2, Search, Clock } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Multi-City Itineraries",
    description: "Create complex travel plans spanning multiple cities and countries with ease.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Organize activities day-by-day with our intuitive calendar and timeline views.",
  },
  {
    icon: Wallet,
    title: "Budget Management",
    description: "Track expenses, get cost breakdowns, and stay within your travel budget.",
  },
  {
    icon: Search,
    title: "Destination Discovery",
    description: "Explore cities and activities with rich information and recommendations.",
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Keep your itinerary updated and accessible wherever you go.",
  },
  {
    icon: Share2,
    title: "Share & Collaborate",
    description: "Share your plans with friends or make them public for the community.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Plan the{" "}
            <span className="text-accent">Perfect Trip</span>
          </h2>
          <p className="text-muted-foreground">
            From inspiration to itinerary, we've got you covered with powerful tools designed for modern travelers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-ocean-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
