import { useState, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Plus, Navigation } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";

// Mock Data matching the Schema structure for visualization
const MOCK_LOCATIONS = [
  {
    id: "1",
    title: "Eiffel Tower",
    lat: 48.8584,
    lng: 2.2945,
    is_must_see: true,
    is_visited: false,
    cost: 35,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
  },
  {
    id: "2",
    title: "Louvre Museum",
    lat: 48.8606,
    lng: 2.3376,
    is_must_see: true,
    is_visited: true,
    cost: 22,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?w=800"
  },
  {
    id: "3",
    title: "Montmartre",
    lat: 48.8872,
    lng: 2.3429,
    is_must_see: false,
    is_visited: false, // Unvisited spot -> Blue
    cost: 0,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1550340499-a6c6030e6953?w=800"
  },
  {
    id: "4",
    title: "Le Marais",
    lat: 48.8575,
    lng: 2.3582,
    is_must_see: false,
    is_visited: false,
    cost: 0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1509439649568-d0554157d6e4?w=800"
  }
];

const Explore = () => {
  // Default to Paris
  const [viewState, setViewState] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12
  });
  const [selectedLocation, setSelectedLocation] = useState<typeof MOCK_LOCATIONS[0] | null>(null);
  const { theme } = useTheme();

  // In a real app, this should be an env variable
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "pk.eyJ1IjoiZXhhbXcGxlIiwiYSI6ImNrN...key_here";

  // If no token is present, we might want to show a warning or fallback, 
  // but for the prompt's request we build the UI assuming it works or will work.
  const hasToken = MAPBOX_TOKEN && !MAPBOX_TOKEN.includes("key_here");

  return (
    <div className="h-[calc(100vh-4rem)] w-full flex flex-col md:flex-row relative bg-background overflow-hidden rounded-tl-2xl">
      {/* Map Container */}
      <div className="flex-1 h-full relative">
        {!hasToken && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6 text-center">
            <div className="max-w-md">
              <h2 className="text-xl font-bold mb-2">Mapbox Token Required</h2>
              <p className="text-muted-foreground mb-4">Please add VITE_MAPBOX_TOKEN to your .env file to enable the interactive map.</p>
              <Button variant="outline" onClick={() => window.open('https://mapbox.com', '_blank')}>Get Mapbox Token</Button>
            </div>
          </div>
        )}

        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle={theme === 'dark' ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/streets-v12"}
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <NavigationControl position="bottom-right" />

          {MOCK_LOCATIONS.map((loc) => (
            <Marker key={loc.id} latitude={loc.lat} longitude={loc.lng} anchor="bottom">
              <div
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLocation(loc);
                }}
              >
                {/* 
                  'Must-See' landmarks are Gold (is_must_see)
                  'Unvisited' spots (based on is_visited) are Blue
                  If visited, maybe green or gray? Prompt only specified Gold/Blue distinction.
                  We'll stick to Gold for Must-See, Blue for Unvisited( && !Must-See), and maybe Gray/Check for Visited.
                */}
                <MapPin
                  className={`w-8 h-8 drop-shadow-lg ${loc.is_must_see
                    ? "text-yellow-500 fill-yellow-500 animate-bounce"
                    : loc.is_visited
                      ? "text-green-500 fill-green-500"
                      : "text-blue-500 fill-blue-500"
                    }`}
                />
              </div>
            </Marker>
          ))}

          {selectedLocation && (
            <Popup
              latitude={selectedLocation.lat}
              longitude={selectedLocation.lng}
              anchor="top"
              onClose={() => setSelectedLocation(null)}
              closeButton={false}
              className="z-50"
            >
              <Card className="w-64 p-0 shadow-lg border-none">
                <div className="relative h-32 w-full">
                  <img src={selectedLocation.image} alt={selectedLocation.title} className="w-full h-full object-cover rounded-t-xl" />
                  <Badge className={`absolute top-2 left-2 ${selectedLocation.is_must_see ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"}`}>
                    {selectedLocation.is_must_see ? "Must See" : "Explore"}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-sm">{selectedLocation.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                        {selectedLocation.rating}
                      </div>
                    </div>
                    <span className="font-semibold text-sm">${selectedLocation.cost}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="w-full text-xs" onClick={() => console.log("Add to itinerary")}>
                      <Plus className="w-3 h-3 mr-1" /> Add
                    </Button>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      <Navigation className="w-3 h-3 mr-1" /> Go
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Popup>
          )}
        </Map>
      </div>

      {/* Sidebar / Overlay for Discovery (Optional List View) */}
      <div className="hidden lg:block w-80 h-full border-l border-border bg-card p-4 overflow-y-auto">
        <h2 className="font-display font-bold text-xl mb-4">Discovery</h2>
        <div className="space-y-3">
          {MOCK_LOCATIONS.map(loc => (
            <div
              key={loc.id}
              className={`flex gap-3 p-3 rounded-xl border cursor-pointer hover:bg-accent/50 transition-colors ${selectedLocation?.id === loc.id ? 'border-primary bg-accent' : 'border-border'}`}
              onClick={() => {
                setSelectedLocation(loc);
                setViewState(prev => ({ ...prev, latitude: loc.lat, longitude: loc.lng, zoom: 14 }));
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
                <p className="text-xs text-muted-foreground mt-1">
                  {loc.is_visited ? "Visited" : loc.is_must_see ? "Must See" : "Recommended"}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs font-medium">
                  <span className="text-primary">${loc.cost}</span>
                  <span className="text-muted-foreground mx-1">•</span>
                  <span>{loc.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
