import { ContactUs } from "@/components/contact_us"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <ContactUs />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
