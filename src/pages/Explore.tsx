import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // Import Footer
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Navigation } from "lucide-react";
import { useTheme } from "next-themes";
import { renderToStaticMarkup } from "react-dom/server";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// Fix for default Leaflet markers in React
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom Marker Icons
const createCustomIcon = (colorClass: string) => {
  const svgString = renderToStaticMarkup(
    <div className={`w - 8 h - 8 rounded - full border - 2 border - white shadow - lg flex items - center justify - center ${colorClass} `}>
      <div className="w-2 h-2 bg-white rounded-full" />
    </div>
  );

  return L.divIcon({
    html: svgString,
    className: "custom-leaflet-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const goldIcon = createCustomIcon("bg-yellow-500 animate-bounce");
const blueIcon = createCustomIcon("bg-blue-500");
const greenIcon = createCustomIcon("bg-green-500");

// --- Coordinate Dictionary for Demo ---
const CITY_COORDINATES: Record<string, [number, number]> = {
  "Paris": [48.8566, 2.3522],
  "London": [51.5074, -0.1278],
  "New York": [40.7128, -74.0060],
  "Tokyo": [35.6762, 139.6503],
  "Rome": [41.9028, 12.4964],
  "Barcelona": [41.3851, 2.1734],
  "Sydney": [-33.8688, 151.2093],
  "Dubai": [25.2048, 55.2708],
  "Singapore": [1.3521, 103.8198],
  "Bali": [-8.4095, 115.1889],
  "Bangkok": [13.7563, 100.5018],
  "Istanbul": [41.0082, 28.9784],
  "Amsterdam": [52.3676, 4.9041],
  "Prague": [50.0755, 14.4378],
  "Berlin": [52.5200, 13.4050],
  "Vienna": [48.2082, 16.3738],
  "Madrid": [40.4168, -3.7038],
  "Lisbon": [38.7223, -9.1393],
  "Athens": [37.9838, 23.7275],
  "Santorini": [36.3932, 25.4615],
  "Florence": [43.7696, 11.2558],
  "Venice": [45.4408, 12.3155],
  "Cairo": [30.0444, 31.2357],
  "Cape Town": [-33.9249, 18.4241],
  "Rio de Janeiro": [-22.9068, -43.1729],
  "Buenos Aires": [-34.6037, -58.3816],
  "Mexico City": [19.4326, -99.1332],
  "Los Angeles": [34.0522, -118.2437],
  "San Francisco": [37.7749, -122.4194],
  "Vancouver": [49.2827, -123.1207],
  "Kyoto": [35.0116, 135.7681],
  "Osaka": [34.6937, 135.5023],
  "Seoul": [37.5665, 126.9780],
  "Mumbai": [19.0760, 72.8777],
  "Delhi": [28.6139, 77.2090],
  "Chennai": [13.0827, 80.2707],
};

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", // Paris
  "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?w=800", // Louvre
  "https://images.unsplash.com/photo-1550340499-a6c6030e6953?w=800", // Vintage
  "https://images.unsplash.com/photo-1509439649568-d0554157d6e4?w=800", // City
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800", // London
  "https://images.unsplash.com/photo-1503899036084-c55cdd920a26?w=800", // Tokyo
];

interface LocationItem {
  id: string;
  title: string;
  lat: number;
  lng: number;
  is_must_see: boolean;
  is_visited: boolean;
  cost: number;
  rating: number;
  image: string;
  type: "trip" | "recommendation";
}

// Mock Recommendations to show when no trips or to supplement
const MOCK_RECOMMENDATIONS: LocationItem[] = [
  {
    id: "rec-1",
    title: "Eiffel Tower",
    lat: 48.8584,
    lng: 2.2945,
    is_must_see: true,
    is_visited: false,
    cost: 35,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    type: "recommendation"
  },
  {
    id: "rec-2",
    title: "Louvre Museum",
    lat: 48.8606,
    lng: 2.3376,
    is_must_see: true,
    is_visited: true,
    cost: 22,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?w=800",
    type: "recommendation"
  },
];

// Determine coordinates based on trip name
const getCoordinates = (name: string): [number, number] => {
  // Simple check: does the name contain a city?
  for (const city in CITY_COORDINATES) {
    if (name.toLowerCase().includes(city.toLowerCase())) {
      return CITY_COORDINATES[city];
    }
  }
  // Fallback: Random location in Europe/World or just return Paris with small offset
  // Let's use a consistent hash to place them deterministically if unknown
  const hash = name.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const latOffset = (hash % 100) / 100; // 0.00-0.99
  const lngOffset = (hash % 50) / 100;
  // Fallback to "somewhere near Paris" for demo if unknown
  return [48.8566 + latOffset, 2.3522 + lngOffset];
};

const getImage = (coverImage: string | null, name: string): string => {
  if (coverImage) return coverImage;
  // Return deterministic default image based on name length
  return DEFAULT_IMAGES[name.length % DEFAULT_IMAGES.length];
};

// Component to handle map view updates
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Explore = () => {
  const { user } = useAuth();
  const [locations, setLocations] = useState<LocationItem[]>(MOCK_RECOMMENDATIONS);
  const [loading, setLoading] = useState(true);

  // Default to Paris
  const [viewState, setViewState] = useState({
    center: [48.8566, 2.3522] as [number, number],
    zoom: 13
  });
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data: trips, error } = await supabase
          .from('trips')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        if (trips && trips.length > 0) {
          const tripLocations: LocationItem[] = trips.map(trip => {
            const [lat, lng] = getCoordinates(trip.name);
            return {
              id: trip.id,
              title: trip.name, // Trip Name
              lat,
              lng,
              is_must_see: false, // Trips are "Planned"
              is_visited: new Date(trip.end_date) < new Date(), // Past trips are visited
              cost: trip.budget_limit || 0,
              rating: 5.0, // Default
              image: getImage(trip.cover_image, trip.name),
              type: "trip"
            };
          });

          // Combine with recommendations or just show trips?
          // User said "The list of places... must be dynamic... automatically appear".
          // We will put User Trips FIRST.
          setLocations([...tripLocations, ...MOCK_RECOMMENDATIONS]);

          // Center map on the first trip if available
          if (tripLocations.length > 0) {
            setViewState({ center: [tripLocations[0].lat, tripLocations[0].lng], zoom: 5 });
          }
        } else {
          // If no trips, just show recommendations
          setLocations(MOCK_RECOMMENDATIONS);
        }
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();

    // Set up realtime subscription for new trips
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'trips',
        },
        (payload) => {
          console.log('New trip received!', payload);
          fetchTrips(); // Refetch to update list
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex flex-col md:flex-row relative overflow-hidden pt-20">
        {/* Map Container - fills remaining space */}
        <div className="flex-1 relative min-h-[500px] z-0">
          <MapContainer
            center={viewState.center}
            zoom={viewState.zoom}
            style={{ width: "100%", height: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={theme === 'dark'
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              }
            />
            <MapUpdater center={viewState.center} zoom={viewState.zoom} />

            {locations.map((loc) => (
              <Marker
                key={loc.id}
                position={[loc.lat, loc.lng]}
                icon={loc.type === "trip" ? greenIcon : loc.is_must_see ? goldIcon : blueIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedLocation(loc);
                  },
                }}
              >
                {selectedLocation?.id === loc.id && (
                  <Popup className="custom-popup" closeButton={false} maxWidth={300} minWidth={250}>
                    <div className="rounded-xl overflow-hidden shadow-none border-none p-0 m-0 w-full font-sans">
                      <div className="relative h-32 w-full">
                        <img src={loc.image} alt={loc.title} className="w-full h-full object-cover" />
                        <Badge className={`absolute top - 2 left - 2 border - 0 ${loc.type === "trip" ? "bg-green-500" : loc.is_must_see ? "bg-yellow-500" : "bg-blue-500"} `}>
                          {loc.type === "trip" ? "My Trip" : loc.is_must_see ? "Must See" : "Explore"}
                        </Badge>
                      </div>
                      <div className="p-3 bg-card text-card-foreground">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-sm m-0 leading-tight">{loc.title}</h3>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              {loc.type === "recommendation" && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />}
                              {loc.type === "recommendation" ? loc.rating : "Planned"}
                            </div>
                          </div>
                          <span className="font-semibold text-sm">₹{loc.cost.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="w-full text-xs h-8">
                            <Plus className="w-3 h-3 mr-1" /> View
                          </Button>
                          <Button size="sm" variant="outline" className="w-full text-xs h-8">
                            <Navigation className="w-3 h-3 mr-1" /> Go
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Sidebar / Overlay for Discovery (List View) */}
        <div className="hidden lg:block w-80 border-l border-border bg-card p-4 overflow-y-auto shrink-0 z-10 shadow-xl max-h-[calc(100vh-5rem)]">
          <h2 className="font-display font-bold text-xl mb-4">Discovery</h2>
          <div className="space-y-3">
            {locations.map(loc => (
              <div
                key={loc.id}
                className={`flex gap - 3 p - 3 rounded - xl border cursor - pointer hover: bg - accent / 50 transition - colors ${selectedLocation?.id === loc.id ? 'border-primary bg-accent' : 'border-border'} `}
                onClick={() => {
                  setSelectedLocation(loc);
                  setViewState({ center: [loc.lat, loc.lng], zoom: 10 });
                }}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img src={loc.image} className="w-full h-full object-cover" alt={loc.title} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm truncate">{loc.title}</h3>
                    {loc.is_must_see && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <Badge variant="outline" className="text-[10px] mt-1 h-5">
                    {loc.type === "trip" ? "My Trip" : loc.is_visited ? "Visited" : "Recommended"}
                  </Badge>
                  <div className="flex items-center gap-1 mt-2 text-xs font-medium">
                    <span className="text-primary">₹{loc.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
