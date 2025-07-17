import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Denver, CO",
      rating: 5,
      text: "I found the most beautiful handwoven scarf on Handcrafted Haven. The quality is exceptional and I love supporting local artisans!",
      product: "Handwoven Alpaca Scarf",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Seattle, WA",
      rating: 5,
      text: "As a seller, this platform has been amazing for my pottery business. The community is supportive and the customers truly appreciate handmade work.",
      product: "Ceramic Bowl Set",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Austin, TX",
      rating: 5,
      text: "Every piece I've purchased tells a story. The artisans are so talented and the customer service is outstanding. Highly recommend!",
      product: "Macrame Wall Hanging",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section className="py-16 bg-sage-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">What Our Community Says</h2>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Hear from artisans and customers who are part of the Handcrafted Haven family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white border-sage-200 hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-terracotta-400 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-sage-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-sage-900">{testimonial.name}</h4>
                    <p className="text-sm text-sage-600">{testimonial.location}</p>
                    <p className="text-xs text-terracotta-600 mt-1">Purchased: {testimonial.product}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-sage-600">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="text-lg font-semibold">4.9/5</span>
            <span>average rating from 1,200+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}
