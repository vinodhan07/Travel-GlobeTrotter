import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star, DollarSign, Filter } from "lucide-react";
import destParis from "@/assets/dest-paris.jpg";
import destTokyo from "@/assets/dest-tokyo.jpg";
import destBali from "@/assets/dest-bali.jpg";
import destSantorini from "@/assets/dest-santorini.jpg";

const allDestinations = [
  { id: 1, name: "Paris", country: "France", region: "Europe", rating: 4.9, costIndex: "$$$", image: destParis, description: "City of lights, romance, and incredible cuisine." },
  { id: 2, name: "Tokyo", country: "Japan", region: "Asia", rating: 4.8, costIndex: "$$", image: destTokyo, description: "Where ancient tradition meets futuristic innovation." },
  { id: 3, name: "Bali", country: "Indonesia", region: "Asia", rating: 4.7, costIndex: "$", image: destBali, description: "Tropical paradise with spiritual retreats and beaches." },
  { id: 4, name: "Santorini", country: "Greece", region: "Europe", rating: 4.9, costIndex: "$$$", image: destSantorini, description: "Stunning sunsets over the Aegean Sea." },
  { id: 5, name: "New York", country: "USA", region: "North America", rating: 4.6, costIndex: "$$$", image: destParis, description: "The city that never sleeps." },
  { id: 6, name: "Sydney", country: "Australia", region: "Oceania", rating: 4.7, costIndex: "$$", image: destSantorini, description: "Iconic harbor, beaches, and outdoor lifestyle." },
];

const regions = ["All", "Europe", "Asia", "North America", "Oceania"];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filteredDestinations = allDestinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "All" || dest.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore <span className="text-accent">Destinations</span>
            </h1>
            <p className="text-muted-foreground">
              Discover amazing cities around the world and add them to your next adventure
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search cities or countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedRegion === region
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium">
                      <Star className="w-3 h-3 text-sunset fill-sunset" />
                      {dest.rating}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-palm">
                      {dest.costIndex}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{dest.country} • {dest.region}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {dest.description}
                  </p>
                  <Button variant="outline" className="w-full">
                    Add to Trip
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No destinations found. Try a different search.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
