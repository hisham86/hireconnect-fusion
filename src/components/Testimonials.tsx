
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
    quote: "CodingCats has clawed our hiring time in half! No more endless email chains—just the info we need, pronto.",
    author: "Sarah Johnson",
    title: "Head of Talent Acquisition at TechGrowth",
    type: "recruiter"
  },
  {
    quote: "As an engineer, I'm feline fine with one profile for all my details—I share it only with companies I'm paws-itively interested in!",
    author: "Michael Chen",
    title: "Senior Software Engineer",
    type: "engineer"
  },
  {
    quote: "The transparency on this platform makes salary talks a catwalk. It's a game-changer for both sides!",
    author: "Jessica Williams",
    title: "Engineering Manager at CloudScale",
    type: "engineer"
  },
  {
    quote: "We've boosted our engineering hire success rate by 40% since joining this litter. The pre-qualification info is the cat's meow!",
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
          <p className="text-lg text-gray-700">
            Hear from the cats and recruiters who've scratched the surface of hiring with CodingCats!
          </p>
        </div>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/1">
                <Card className="border shadow-lg">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Quote className="h-8 w-8 text-brand-primary opacity-60" />
                    </div>
                    <p className="text-lg mb-6 text-gray-800">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                        <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-brand-light text-brand-primary font-medium">
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
