import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      title: "Happy Customer",
      quote:
        "I absolutely love the unique items I've found on Handcrafted Haven. The quality is exceptional, and it feels great to support independent artisans!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "John Smith",
      title: "Repeat Buyer",
      quote:
        "The attention to detail in every product is amazing. Handcrafted Haven has become my go-to for thoughtful gifts and beautiful home decor.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Emily White",
      title: "Art Enthusiast",
      quote:
        "As an artist myself, I appreciate the platform's commitment to showcasing genuine craftsmanship. It's a true gem for unique finds.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section className="bg-terracotta-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-sage-900 text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 shadow-lg bg-white">
              <CardContent className="p-0">
                <p className="text-lg text-sage-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4 border-2 border-terracotta-400">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sage-900">{testimonial.name}</p>
                    <p className="text-sm text-sage-600">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
