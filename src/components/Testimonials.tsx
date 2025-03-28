
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "HireConnectFusion has cut our hiring process time in half. We now have immediate access to the information we need without endless email chains.",
    author: "Sarah Johnson",
    title: "Head of Talent Acquisition at TechGrowth",
    type: "recruiter"
  },
  {
    quote: "As an engineer, I love how I can maintain one profile with all my details and share it selectively with companies I'm interested in.",
    author: "Michael Chen",
    title: "Senior Software Engineer",
    type: "engineer"
  },
  {
    quote: "The transparency this platform provides has made salary discussions much more straightforward. It's a game-changer for both sides.",
    author: "Jessica Williams",
    title: "Engineering Manager at CloudScale",
    type: "engineer"
  },
  {
    quote: "We've increased our engineering hire success rate by 40% since using this platform. The pre-qualification information is invaluable.",
    author: "Robert Martinez",
    title: "Technical Recruiter at InnovateTech",
    type: "recruiter"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600">
            Hear from engineers and recruiters who have transformed their hiring process with HireConnectFusion.
          </p>
        </div>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/1">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Quote className="h-8 w-8 text-brand-primary opacity-40" />
                    </div>
                    <p className="text-lg mb-6 text-gray-700">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                        <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-brand-light text-brand-primary">
                          {testimonial.type === "engineer" ? "Engineer" : "Recruiter"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative static left-0 right-0 translate-y-0 mr-2" />
            <CarouselNext className="relative static left-0 right-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
