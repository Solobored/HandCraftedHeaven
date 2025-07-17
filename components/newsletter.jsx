import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift, Bell, Sparkles } from "lucide-react"

export default function Newsletter() {
  return (
    <section className="py-16 bg-gradient-to-br from-terracotta-50 to-sage-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-sage-200 shadow-xl">
          <CardContent className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-4">
                  <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-terracotta-600" />
                  </div>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">
                  Stay Connected with Our Artisan Community
                </h2>

                <p className="text-lg text-sage-600 mb-6 leading-relaxed">
                  Get the latest handcrafted treasures, artisan stories, and exclusive offers delivered to your inbox.
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center lg:justify-start">
                    <Gift className="w-5 h-5 text-terracotta-600 mr-3" />
                    <span className="text-sage-700">Exclusive early access to new collections</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start">
                    <Bell className="w-5 h-5 text-terracotta-600 mr-3" />
                    <span className="text-sage-700">Weekly artisan spotlights and stories</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start">
                    <Sparkles className="w-5 h-5 text-terracotta-600 mr-3" />
                    <span className="text-sage-700">Special subscriber-only discounts</span>
                  </div>
                </div>
              </div>

              {/* Newsletter Form */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-sage-200">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="border-sage-300 focus:border-terracotta-400 focus:ring-terracotta-400"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-sage-700 mb-2">
                      First Name (Optional)
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your first name"
                      className="border-sage-300 focus:border-terracotta-400 focus:ring-terracotta-400"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      id="consent"
                      type="checkbox"
                      className="mt-1 rounded border-sage-300 text-terracotta-600 focus:ring-terracotta-400"
                      required
                    />
                    <label htmlFor="consent" className="text-xs text-sage-600 leading-relaxed">
                      I agree to receive marketing emails and understand I can unsubscribe at any time.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white"
                    size="lg"
                  >
                    Join Our Community
                  </Button>
                </form>

                <p className="text-xs text-sage-500 text-center mt-4">
                  Join 5,000+ craft enthusiasts already subscribed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
