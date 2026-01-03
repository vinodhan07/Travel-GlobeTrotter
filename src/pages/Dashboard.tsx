import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, MapPin, Wallet, ChevronRight } from "lucide-react";
import destParis from "@/assets/dest-paris.jpg";
import destTokyo from "@/assets/dest-tokyo.jpg";
import destBali from "@/assets/dest-bali.jpg";
import destSantorini from "@/assets/dest-santorini.jpg";

const upcomingTrips = [
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
];

const popularDestinations = [
  { name: "Bali", country: "Indonesia", image: destBali },
  { name: "Santorini", country: "Greece", image: destSantorini },
  { name: "Tokyo", country: "Japan", image: destTokyo },
  { name: "Paris", country: "France", image: destParis },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome back, Traveler! 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to plan your next adventure?
              </p>
            </div>
            <Link to="/trips/create">
              <Button variant="ocean" size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Create New Trip
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Trips", value: "12", icon: MapPin, color: "from-primary to-ocean-light" },
              { label: "Destinations", value: "28", icon: Calendar, color: "from-accent to-coral" },
              { label: "Budget Saved", value: "$2,340", icon: Wallet, color: "from-palm to-palm" },
            ].map((stat, index) => (
              <div key={index} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Trips */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Your Trips
                </h2>
                <Link to="/trips" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingTrips.map((trip) => (
                  <Link
                    key={trip.id}
                    to={`/trips/${trip.id}`}
                    className="flex flex-col sm:flex-row gap-4 bg-card rounded-2xl border border-border p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                  >
                    <div className="w-full sm:w-32 h-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={trip.image}
                        alt={trip.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {trip.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === "upcoming" 
                            ? "bg-palm/10 text-palm" 
                            : "bg-accent/10 text-accent"
                        }`}>
                          {trip.status === "upcoming" ? "Upcoming" : "Planning"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {trip.startDate} - {trip.endDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {trip.destinations.length} cities
                        </span>
                        <span className="flex items-center gap-1">
                          <Wallet className="w-4 h-4" />
                          ${trip.budget.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions & Popular */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Popular Destinations
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {popularDestinations.map((dest, index) => (
                    <Link
                      key={index}
                      to={`/explore?city=${dest.name}`}
                      className="group relative rounded-xl overflow-hidden aspect-square"
                    >
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-primary-foreground font-semibold text-sm">{dest.name}</p>
                        <p className="text-primary-foreground/70 text-xs">{dest.country}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
