
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Set up a profile with all your skills, experience, and salary expectations—your ticket to the job jungle!",
    for: "Engineers"
  },
  {
    number: "02",
    title: "Search for Opportunities",
    description: "Browse jobs or let recruiters sniff out your profile (don't worry, you control the leash).",
    for: "Engineers"
  },
  {
    number: "03",
    title: "Connect with Companies",
    description: "When the vibe is right, share your details automatically—no more repetitive emails!",
    for: "Engineers"
  },
  {
    number: "01",
    title: "Set up Team Account",
    description: "Create your company profile and rally your pack to the recruiting dashboard.",
    for: "Recruiters"
  },
  {
    number: "02",
    title: "Find Qualified Candidates",
    description: "Search our database with filters sharper than a cat's claws—skills, experience, and more!",
    for: "Recruiters"
  },
  {
    number: "03",
    title: "Access Complete Information",
    description: "Get the full scoop on candidates, so you can make decisions faster than a dog chasing its tail.",
    for: "Recruiters"
  }
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-700">
            CodingCats makes hiring as easy as herding cats (but way more fun)!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-brand-light text-brand-primary font-medium">
                For Engineers
              </span>
            </div>
            <div className="space-y-12 relative">
              <div className="absolute left-7 top-8 bottom-0 w-0.5 bg-gray-300 -z-10"></div>
              {steps.filter(step => step.for === "Engineers").map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                  {index < 2 && (
                    <div className="absolute left-7 top-14 flex justify-center">
                      <ArrowRight className="text-gray-400 h-6 w-6 my-4 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-brand-light text-brand-primary font-medium">
                For Recruiters
              </span>
            </div>
            <div className="space-y-12 relative">
              <div className="absolute left-7 top-8 bottom-0 w-0.5 bg-gray-300 -z-10"></div>
              {steps.filter(step => step.for === "Recruiters").map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-14 h-14 bg-brand-secondary text-white rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                  {index < 2 && (
                    <div className="absolute left-7 top-14 flex justify-center">
                      <ArrowRight className="text-gray-400 h-6 w-6 my-4 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
