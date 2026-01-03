import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = [
  "Free to get started",
  "No credit card required",
  "Unlimited trips",
  "Share with friends",
];

const CTASection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-ocean p-12 md:p-16">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-sky/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Start Your{" "}
              <span className="text-accent">Adventure?</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of travelers who are already planning their dream trips with GlobeTrotter.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-primary-foreground/90"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/signup">
              <Button variant="sunset" size="xl" className="animate-pulse-glow">
                Create Your First Trip
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
