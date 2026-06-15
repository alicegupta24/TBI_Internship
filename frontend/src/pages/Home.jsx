import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Card from "../components/Card"
import Footer from "../components/Footer"

function Home() {
return (
<> <Navbar /> <Hero />

```
  <div className="grid md:grid-cols-2 gap-6 p-6">
    <Card
      title="Review Analysis"
      description="Analyze guest reviews with AI-powered insights."
    />
    <Card
      title="Trend Dashboard"
      description="Track customer sentiment and service trends."
    />
  </div>

  <Footer />
</>
)
}

export default Home
