import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Leaf, Award, Target, Eye, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

const values = [
  {
    icon: Heart,
    title: "Passion for Craftsmanship",
    description:
      "We believe in the beauty and value of handmade items, celebrating the skill and dedication of artisans worldwide.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Building meaningful connections between creators and customers, fostering a supportive community of craft enthusiasts.",
  },
  {
    icon: Leaf,
    title: "Sustainable Living",
    description:
      "Promoting eco-friendly practices through handmade goods that reduce waste and support sustainable consumption.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "Maintaining high standards for all products while ensuring fair compensation and recognition for artisans.",
  },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Former craft fair organizer with 15 years of experience connecting artisans with customers.",
  },
  {
    name: "Michael Chen",
    role: "Head of Artisan Relations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Woodworker turned advocate, helping artisans build successful online businesses.",
  },
  {
    name: "Elena Rodriguez",
    role: "Community Manager",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Passionate about storytelling and showcasing the unique stories behind each handcrafted piece.",
  },
  {
    name: "David Kim",
    role: "Technology Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Building user-friendly platforms that make it easy for artisans to share their craft with the world.",
  },
]

const stats = [
  { number: "500+", label: "Active Artisans" },
  { number: "10,000+", label: "Happy Customers" },
  { number: "50,000+", label: "Products Sold" },
  { number: "25", label: "Countries Reached" },
]

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "Handcrafted Haven was founded with a simple mission: connect talented artisans with people who appreciate handmade quality.",
  },
  {
    year: "2020",
    title: "Community Growth",
    description:
      "Reached 100 artisans and launched our seller support program to help creators build sustainable businesses.",
  },
  {
    year: "2021",
    title: "Global Expansion",
    description:
      "Expanded internationally, welcoming artisans from 15 countries and introducing multi-language support.",
  },
  {
    year: "2022",
    title: "Sustainability Focus",
    description:
      "Launched our eco-friendly initiative, partnering with artisans who use sustainable materials and practices.",
  },
  {
    year: "2023",
    title: "Innovation & Growth",
    description: "Introduced AR try-on features and virtual craft workshops, reaching over 10,000 satisfied customers.",
  },
  {
    year: "2024",
    title: "Community Impact",
    description:
      "Celebrating 500+ active artisans and launching our artisan scholarship program for emerging creators.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-sage-50 to-terracotta-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-sage-900 mb-6">
                Celebrating the Art of
                <span className="text-terracotta-600 block">Handmade Craftsmanship</span>
              </h1>
              <p className="text-xl text-sage-600 leading-relaxed mb-8">
                We're more than just a marketplace – we're a community dedicated to preserving traditional crafts,
                supporting artisan livelihoods, and bringing the beauty of handmade items to homes worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                  <Link href="/browse">Explore Our Collection</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
                >
                  <Link href="/sellers">Meet Our Artisans</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Handcrafted Haven */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-sage-900 mb-4">About Handcrafted Haven</h1>
          <p className="text-xl text-sage-700 max-w-3xl mx-auto">
            Discover the beauty of unique, handmade creations and connect directly with the artisans who pour their
            heart and soul into every piece.
          </p>
        </section>

        {/* Our Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Artisan working on a craft"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-sage-900 mb-4">Our Story</h2>
            <p className="text-lg text-sage-700 leading-relaxed">
              Handcrafted Haven was born from a passion for authentic craftsmanship and a desire to support independent
              artisans. In a world of mass production, we believe in the value of unique, handmade items that tell a
              story. Our platform provides a space for talented creators to share their work with a global audience,
              fostering a community built on creativity, quality, and connection.
            </p>
          </div>
        </section>

        {/* Separator */}
        <Separator className="my-12 bg-sage-200" />

        {/* Our Mission */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-sage-900 mb-8 text-center">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-terracotta-600">Empower Artisans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sage-700">
                  Provide a robust platform for creators to showcase, sell, and grow their handcrafted businesses
                  without high fees or complex setups.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-terracotta-600">Inspire Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sage-700">
                  Offer a curated marketplace where buyers can easily find unique, high-quality handmade goods that
                  resonate with their personal style.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-terracotta-600">Foster Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sage-700">
                  Build a vibrant community around craftsmanship, connecting makers with enthusiasts and promoting
                  sustainable, ethical consumption.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Separator */}
        <Separator className="my-12 bg-sage-200" />

        {/* Join Our Journey */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sage-900 mb-4">Join Our Journey</h2>
          <p className="text-lg text-sage-700 max-w-3xl mx-auto">
            Whether you're an artisan looking for a home for your creations or a buyer seeking something truly special,
            Handcrafted Haven is your destination.
          </p>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-sage-900 mb-2">{stat.number}</div>
                  <p className="text-sage-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-sage-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Target className="w-8 h-8 text-terracotta-600 mr-3" />
                    <h2 className="text-3xl font-bold text-sage-900">Our Mission</h2>
                  </div>
                  <p className="text-lg text-sage-600 leading-relaxed">
                    To create a thriving global marketplace where artisans can share their passion, preserve traditional
                    crafts, and build sustainable livelihoods while connecting customers with unique, high-quality
                    handmade products that tell a story.
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <Eye className="w-8 h-8 text-sage-600 mr-3" />
                    <h2 className="text-3xl font-bold text-sage-900">Our Vision</h2>
                  </div>
                  <p className="text-lg text-sage-600 leading-relaxed">
                    A world where handmade craftsmanship is valued, celebrated, and accessible to all, where every
                    purchase supports an artisan's dream and contributes to a more sustainable and meaningful way of
                    living.
                  </p>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Artisan at work"
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-6 max-w-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-terracotta-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sage-800">Made with Love</p>
                      <p className="text-sm text-sage-600">Every piece tells a story</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto">
                These principles guide everything we do and shape our commitment to artisans and customers alike
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card key={index} className="text-center border-sage-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-terracotta-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-sage-900 mb-3">{value.title}</h3>
                      <p className="text-sage-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-sage-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Our Journey</h2>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto">
                From a small idea to a global community of artisans and craft enthusiasts
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sage-300 hidden md:block"></div>

                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative flex items-start">
                      {/* Timeline dot */}
                      <div className="hidden md:flex w-16 h-16 bg-terracotta-600 rounded-full items-center justify-center text-white font-bold text-sm mr-8 relative z-10">
                        {milestone.year}
                      </div>

                      {/* Content */}
                      <Card className="flex-1 border-sage-200">
                        <CardContent className="p-6">
                          <div className="md:hidden mb-3">
                            <span className="inline-block bg-terracotta-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-sage-900 mb-2">{milestone.title}</h3>
                          <p className="text-sage-600 leading-relaxed">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto">
                Passionate individuals dedicated to supporting artisans and building a thriving craft community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center border-sage-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-sage-900 mb-1">{member.name}</h3>
                    <p className="text-terracotta-600 font-medium mb-3">{member.role}</p>
                    <p className="text-sage-600 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-terracotta-50 to-sage-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Globe className="w-16 h-16 text-terracotta-600 mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold text-sage-900 mb-4">Join Our Global Community</h2>
              <p className="text-xl text-sage-600 mb-8 leading-relaxed">
                Whether you're an artisan looking to share your craft or a customer seeking unique handmade treasures,
                you're welcome in our community. Together, we're preserving traditions and creating a more meaningful
                way to shop.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                  <Link href="/auth/register">Get Started Today</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
