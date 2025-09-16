// app/about/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 space-y-8">
      <h1 className="text-4xl font-bold text-center">About Us</h1>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            We aim to provide the best quality products with exceptional customer service.
            Our goal is to make your online shopping experience smooth, enjoyable, and trustworthy.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Founded in 2025, our e-commerce platform has grown to serve thousands of happy customers.
            We carefully select each product and ensure the highest standards of quality.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
