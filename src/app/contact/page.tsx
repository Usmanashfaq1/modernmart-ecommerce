// app/contact/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  async function handleSubmit(formData: FormData) {
    "use server"

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // For MVP: just log the data (later, connect to email or database)
    console.log({ name, email, message })

    // Optional: redirect or show success
    // redirect("/thank-you")
  }

  return (
    <div className="max-w-2xl mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <Card>
        <CardHeader>
          <CardTitle>Send us a message</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full border p-2 rounded"
              rows={5}
              required
            />
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
