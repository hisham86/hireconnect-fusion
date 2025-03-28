
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "For Engineers",
    price: "Free",
    description: "Everything you need to manage your job search",
    features: [
      "Comprehensive profile creation",
      "Application tracking",
      "Share details with selected companies",
      "Personalized job recommendations",
      "Privacy controls for sensitive information"
    ],
    cta: "Sign Up Free",
    highlighted: false
  },
  {
    name: "Recruiter Basic",
    price: "$99",
    period: "/month",
    description: "Essential tools for talent acquisition teams",
    features: [
      "Access to engineer database",
      "View complete candidate profiles",
      "Basic filtering and search",
      "Up to 3 team members",
      "Standard support"
    ],
    cta: "Get Started",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Advanced solutions for larger organizations",
    features: [
      "Unlimited team members",
      "Advanced analytics and reporting",
      "API access for ATS integration",
      "Custom workflow automation",
      "Priority support & dedicated manager"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-lg text-gray-600">
            Choose the plan that works best for your needs, with no hidden fees or complicated pricing structures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden border ${
                plan.highlighted
                  ? "border-brand-primary shadow-lg relative border-2"
                  : "border-gray-200"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-brand-primary mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? "bg-brand-primary hover:bg-brand-secondary"
                      : ""
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
