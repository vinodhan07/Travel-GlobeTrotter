import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, MapPin } from "lucide-react";
import destParis from "@/assets/dest-paris.jpg";
import destTokyo from "@/assets/dest-tokyo.jpg";
import destBali from "@/assets/dest-bali.jpg";
import destSantorini from "@/assets/dest-santorini.jpg";

const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: destParis,
    rating: 4.9,
    avgCost: "$150/day",
    featured: true,
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    image: destTokyo,
    rating: 4.8,
    avgCost: "$120/day",
    featured: false,
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    image: destBali,
    rating: 4.7,
    avgCost: "$80/day",
    featured: false,
  },
  {
    id: 4,
    name: "Santorini",
    country: "Greece",
    image: destSantorini,
    rating: 4.9,
    avgCost: "$180/day",
    featured: true,
  },
];

const DestinationsSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              Popular Destinations
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Discover Your Next{" "}
              <span className="text-primary">Adventure</span>
            </h2>
          </div>
          <Link to="/explore">
            <Button variant="outline" className="gap-2">
              View All Destinations
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              to={`/explore?city=${dest.name}`}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="aspect-[4/5] relative">
                <img
                  src={dest.image}
                  alt={`${dest.name}, ${dest.country}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                
                {/* Featured Badge */}
                {dest.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    Featured
                  </div>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm">
                  <Star className="w-3 h-3 text-sunset fill-sunset" />
                  <span className="text-xs font-semibold text-foreground">{dest.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 text-primary-foreground/70 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{dest.country}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-primary-foreground mb-1">
                  {dest.name}
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  From {dest.avgCost}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
