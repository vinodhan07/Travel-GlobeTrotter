import { Link, useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Wallet,
  Share2,
  Edit,
  Clock,
  PieChart,
  Route,
  Briefcase,
} from "lucide-react";
import destParis from "@/assets/dest-paris.jpg";

const tripData = {
  id: 1,
  name: "European Adventure",
  description: "A 15-day adventure through the most beautiful cities in Europe, exploring art, cuisine, and culture.",
  startDate: "Mar 15, 2026",
  endDate: "Mar 30, 2026",
  destinations: ["Paris", "Rome", "Barcelona"],
  budget: 5200,
  spent: 3850,
  image: destParis,
  status: "upcoming",
  days: 15,
  activities: 24,
};

const TripDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/trips"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Trips
          </Link>

          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-8">
            <div className="h-64 md:h-80">
              <img
                src={tripData.image}
                alt={tripData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-palm text-primary-foreground mb-3 inline-block">
                    Upcoming
                  </span>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                    {tripData.name}
                  </h1>
                  <p className="text-primary-foreground/80 max-w-xl">
                    {tripData.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-background/90 hover:bg-background">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Link to={`/trips/${id}/share`}>
                    <Button variant="ocean" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold text-foreground">{tripData.days} days</p>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Destinations</p>
                <p className="font-semibold text-foreground">{tripData.destinations.length} cities</p>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-palm/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-palm" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Activities</p>
                <p className="font-semibold text-foreground">{tripData.activities} planned</p>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-sky" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-semibold text-foreground">${tripData.budget.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Trip Dates */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                  <p className="font-display text-xl font-semibold text-foreground">{tripData.startDate}</p>
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent hidden md:block" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">End Date</p>
                  <p className="font-display text-xl font-semibold text-foreground">{tripData.endDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {tripData.destinations.map((dest, index) => (
                  <span
                    key={dest}
                    className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-foreground"
                  >
                    {dest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
            Trip Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Itinerary Builder */}
            <Link
              to={`/trips/${id}/itinerary`}
              className="group bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl gradient-ocean flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Route className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Itinerary Builder
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Add stops, set dates, and plan activities with drag-and-drop reordering.
              </p>
              <span className="text-primary text-sm font-medium">
                Build itinerary →
              </span>
            </Link>

            {/* Trip Timeline */}
            <Link
              to={`/trips/${id}/timeline`}
              className="group bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg hover:border-accent/30 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-coral flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                Trip Timeline
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                View your full itinerary with day-by-day activities and visual flow.
              </p>
              <span className="text-accent text-sm font-medium">
                View timeline →
              </span>
            </Link>

            {/* Budget Tracker */}
            <Link
              to={`/trips/${id}/budget`}
              className="group bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg hover:border-palm/30 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-palm to-palm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PieChart className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-palm transition-colors">
                Budget Tracker
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Track spending by category with charts and daily alerts.
              </p>
              <span className="text-palm text-sm font-medium">
                View budget →
              </span>
            </Link>

            {/* Packing List */}
            <Link
              to={`/trips/${id}/packing`}
              className="group bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg hover:border-sky/30 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky to-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-sky transition-colors">
                Packing List
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Create and check off items needed for each destination.
              </p>
              <span className="text-sky text-sm font-medium">
                View packing list →
              </span>
            </Link>
          </div>

          {/* Budget Progress */}
          <div className="mt-8 bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Budget Overview
              </h2>
              <Link to={`/trips/${id}/budget`} className="text-primary text-sm hover:underline">
                View details
              </Link>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">
                ${tripData.spent.toLocaleString()} spent of ${tripData.budget.toLocaleString()}
              </span>
              <span className="font-semibold text-foreground">
                {((tripData.spent / tripData.budget) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full gradient-ocean transition-all"
                style={{ width: `${(tripData.spent / tripData.budget) * 100}%` }}
              />
            </div>
            <p className="text-sm text-palm mt-2">
              ${(tripData.budget - tripData.spent).toLocaleString()} remaining
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TripDetail;
