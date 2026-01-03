import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Shirt,
  Briefcase,
  Pill,
  Camera,
  Smartphone,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

interface PackingItem {
  id: string;
  name: string;
  packed: boolean;
}

interface PackingCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  items: PackingItem[];
}

const initialCategories: PackingCategory[] = [
  {
    id: "clothing",
    name: "Clothing",
    icon: Shirt,
    color: "bg-primary/10 text-primary",
    items: [
      { id: "c1", name: "T-shirts (5)", packed: true },
      { id: "c2", name: "Jeans (2)", packed: true },
      { id: "c3", name: "Jacket", packed: false },
      { id: "c4", name: "Underwear (7)", packed: true },
      { id: "c5", name: "Socks (7 pairs)", packed: false },
      { id: "c6", name: "Comfortable walking shoes", packed: true },
      { id: "c7", name: "Sandals", packed: false },
    ],
  },
  {
    id: "toiletries",
    name: "Toiletries & Health",
    icon: Pill,
    color: "bg-palm/10 text-palm",
    items: [
      { id: "t1", name: "Toothbrush & toothpaste", packed: true },
      { id: "t2", name: "Shampoo & conditioner", packed: false },
      { id: "t3", name: "Sunscreen", packed: false },
      { id: "t4", name: "Medications", packed: true },
      { id: "t5", name: "First aid kit", packed: false },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    color: "bg-accent/10 text-accent",
    items: [
      { id: "e1", name: "Phone charger", packed: true },
      { id: "e2", name: "Power bank", packed: true },
      { id: "e3", name: "Camera", packed: false },
      { id: "e4", name: "Universal adapter", packed: false },
      { id: "e5", name: "Headphones", packed: true },
    ],
  },
  {
    id: "documents",
    name: "Documents",
    icon: FileText,
    color: "bg-sky/10 text-sky",
    items: [
      { id: "d1", name: "Passport", packed: true },
      { id: "d2", name: "Travel insurance", packed: true },
      { id: "d3", name: "Flight tickets", packed: true },
      { id: "d4", name: "Hotel confirmations", packed: false },
      { id: "d5", name: "Credit cards", packed: true },
    ],
  },
  {
    id: "accessories",
    name: "Accessories & Misc",
    icon: Camera,
    color: "bg-coral/10 text-coral",
    items: [
      { id: "a1", name: "Sunglasses", packed: false },
      { id: "a2", name: "Day backpack", packed: true },
      { id: "a3", name: "Travel pillow", packed: false },
      { id: "a4", name: "Reusable water bottle", packed: false },
    ],
  },
];

const PackingList = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState<PackingCategory[]>(initialCategories);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    initialCategories.map((c) => c.id)
  );
  const [newItemInputs, setNewItemInputs] = useState<Record<string, string>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, packed: !item.packed } : item
              ),
            }
          : cat
      )
    );
  };

  const addItem = (categoryId: string) => {
    const itemName = newItemInputs[categoryId]?.trim();
    if (!itemName) return;

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: [
                ...cat.items,
                { id: `item-${Date.now()}`, name: itemName, packed: false },
              ],
            }
          : cat
      )
    );
    setNewItemInputs((prev) => ({ ...prev, [categoryId]: "" }));
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
          : cat
      )
    );
  };

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const packedItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter((item) => item.packed).length,
    0
  );
  const progressPercent = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

  const markAllPacked = () => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({ ...item, packed: true })),
      }))
    );
  };

  const resetAll = () => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({ ...item, packed: false })),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            to={`/trips/${id}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Trip
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Packing List
              </h1>
              <p className="text-muted-foreground">
                European Adventure · Keep track of everything you need
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetAll}>
                Reset All
              </Button>
              <Button variant="ocean" size="sm" onClick={markAllPacked}>
                <Sparkles className="w-4 h-4 mr-2" />
                Mark All Packed
              </Button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Packing Progress
                </h2>
                <p className="text-muted-foreground">
                  {packedItems} of {totalItems} items packed
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
              </div>
            </div>
            <Progress value={progressPercent} className="h-3" />
            {progressPercent === 100 && (
              <div className="mt-4 p-3 rounded-xl bg-palm/10 text-palm flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">All packed! You're ready to go! 🎉</span>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {categories.map((category) => {
              const categoryPacked = category.items.filter((i) => i.packed).length;
              const isExpanded = expandedCategories.includes(category.id);
              const Icon = category.icon;

              return (
                <div
                  key={category.id}
                  className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {categoryPacked} / {category.items.length} packed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{
                            width: `${category.items.length > 0 ? (categoryPacked / category.items.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Items */}
                  {isExpanded && (
                    <div className="border-t border-border p-5 space-y-2">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                            item.packed
                              ? "bg-palm/5 border-palm/20"
                              : "bg-muted/30 border-border hover:border-primary/30"
                          }`}
                        >
                          <Checkbox
                            checked={item.packed}
                            onCheckedChange={() => toggleItem(category.id, item.id)}
                            className="w-5 h-5"
                          />
                          <span
                            className={`flex-1 ${
                              item.packed
                                ? "text-muted-foreground line-through"
                                : "text-foreground"
                            }`}
                          >
                            {item.name}
                          </span>
                          <button
                            onClick={() => deleteItem(category.id, item.id)}
                            className="p-1 rounded hover:bg-destructive/10 text-destructive/50 hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      {/* Add New Item */}
                      <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                        <Input
                          placeholder="Add new item..."
                          value={newItemInputs[category.id] || ""}
                          onChange={(e) =>
                            setNewItemInputs((prev) => ({
                              ...prev,
                              [category.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") addItem(category.id);
                          }}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addItem(category.id)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Destination-specific suggestions */}
          <div className="mt-8 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Destination Suggestions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { city: "Paris", items: ["Umbrella", "Formal dinner outfit", "Comfortable walking shoes"] },
                { city: "Rome", items: ["Modest clothing for churches", "Sun hat", "Guidebook"] },
                { city: "Barcelona", items: ["Beachwear", "Sunscreen SPF 50", "Spanish phrasebook"] },
              ].map((dest) => (
                <div key={dest.city} className="p-4 rounded-xl bg-muted/30 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">{dest.city}</h3>
                  <ul className="space-y-1">
                    {dest.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PackingList;
