
import { Code, Users, Clock, DollarSign, Briefcase, Shield } from 'lucide-react';

const featureData = [
  {
    icon: <Code className="h-8 w-8 text-brand-primary" />,
    title: "Engineer Profiles",
    description: "Build a profile that's the cat's pajamas—skills, experience, salary, and availability, all in one spot!",
    forEngineers: true
  },
  {
    icon: <Briefcase className="h-8 w-8 text-brand-primary" />,
    title: "Application Tracking",
    description: "Keep tabs on your applications, interviews, and offers in a dashboard that's purr-fectly organized.",
    forEngineers: true
  },
  {
    icon: <DollarSign className="h-8 w-8 text-brand-primary" />,
    title: "Salary Transparency",
    description: "Share your salary expectations with companies you're feline good about—no awkward meow-ments!",
    forEngineers: true
  },
  {
    icon: <Users className="h-8 w-8 text-brand-primary" />,
    title: "Candidate Database",
    description: "Dig into a treasure trove of qualified engineering candidates with verified skills.",
    forRecruiters: true
  },
  {
    icon: <Clock className="h-8 w-8 text-brand-primary" />,
    title: "Streamlined Communication",
    description: "Skip the email tag—get all the info you need faster than a cat on a Roomba!",
    forRecruiters: true
  },
  {
    icon: <Shield className="h-8 w-8 text-brand-primary" />,
    title: "Compliance Made Easy",
    description: "Stay paws-itively compliant with data privacy regulations through our secure platform.",
    forRecruiters: true
  }
];

const Features = () => {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">One Platform, Two Paw-spectives</h2>
          <p className="text-lg text-gray-700">
            CodingCats bridges the gap between engineers and talent teams, 
            serving up a litter of features for both sides of the hiring process!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <div className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-brand-light text-brand-primary font-medium mb-4">
                For Engineers
              </span>
              <h3 className="text-2xl font-bold mb-2">Unleash Your Job Hunt!</h3>
              <p className="text-gray-700">
                Take control of your career with tools that make job hunting a walk in the park (or a catnip garden).
              </p>
            </div>
            <div className="space-y-6">
              {featureData
                .filter(feature => feature.forEngineers)
                .map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="flex items-start">
                      <div className="mr-4 p-2 bg-brand-light rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                        <p className="text-gray-700">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-brand-light text-brand-primary font-medium mb-4">
                For Recruiters
              </span>
              <h3 className="text-2xl font-bold mb-2">Pounce on Top Talent!</h3>
              <p className="text-gray-700">
                Simplify hiring with tools that make finding the right candidate a piece of catnip.
              </p>
            </div>
            <div className="space-y-6">
              {featureData
                .filter(feature => feature.forRecruiters)
                .map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="flex items-start">
                      <div className="mr-4 p-2 bg-brand-light rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                        <p className="text-gray-700">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
