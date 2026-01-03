import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, MapPin, Wallet, MoreVertical, Pencil, Trash2, Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import destParis from "@/assets/dest-paris.jpg";
import destTokyo from "@/assets/dest-tokyo.jpg";
import destBali from "@/assets/dest-bali.jpg";
import destSantorini from "@/assets/dest-santorini.jpg";

const trips = [
  {
    id: 1,
    name: "European Adventure",
    startDate: "Mar 15, 2026",
    endDate: "Mar 30, 2026",
    destinations: ["Paris", "Rome", "Barcelona"],
    budget: 5200,
    image: destParis,
    status: "upcoming",
  },
  {
    id: 2,
    name: "Japan Spring Tour",
    startDate: "Apr 5, 2026",
    endDate: "Apr 18, 2026",
    destinations: ["Tokyo", "Kyoto", "Osaka"],
    budget: 4800,
    image: destTokyo,
    status: "planning",
  },
  {
    id: 3,
    name: "Bali Retreat",
    startDate: "May 10, 2026",
    endDate: "May 20, 2026",
    destinations: ["Ubud", "Seminyak", "Uluwatu"],
    budget: 3200,
    image: destBali,
    status: "planning",
  },
  {
    id: 4,
    name: "Greek Islands",
    startDate: "Jun 1, 2026",
    endDate: "Jun 14, 2026",
    destinations: ["Santorini", "Mykonos", "Athens"],
    budget: 4500,
    image: destSantorini,
    status: "planning",
  },
];

const Trips = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "planning">("all");

  const filteredTrips = trips.filter((trip) => {
    if (filter === "all") return true;
    return trip.status === filter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                My Trips
              </h1>
              <p className="text-muted-foreground">
                Manage and view all your travel plans
              </p>
            </div>
            <Link to="/trips/create">
              <Button variant="ocean" size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Create New Trip
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8">
            {[
              { value: "all", label: "All Trips" },
              { value: "upcoming", label: "Upcoming" },
              { value: "planning", label: "Planning" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Trips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                {/* Image */}
                <Link to={`/trips/${trip.id}`} className="block relative h-48">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      trip.status === "upcoming" 
                        ? "bg-palm text-primary-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      {trip.status === "upcoming" ? "Upcoming" : "Planning"}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Link to={`/trips/${trip.id}`}>
                      <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {trip.name}
                      </h3>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded-lg hover:bg-muted transition-colors">
                          <MoreVertical className="w-5 h-5 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 mr-2" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{trip.startDate} - {trip.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.destinations.join(" → ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      <span>Budget: ${trip.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTrips.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No trips found</p>
              <Link to="/trips/create">
                <Button variant="outline">Create Your First Trip</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Trips;
