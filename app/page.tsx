import Homepage from "./homepage.mdx"
import LoginNotification from "./LoginNotification"

export default function HomePage() {
  return (
    <main className="mdx-container">
      <LoginNotification />
      <Homepage />
    </main>
  )
}
