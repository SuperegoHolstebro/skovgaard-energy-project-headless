import '../styles/global.css'
import { PostHogProvider } from '../components/PostHogProvider'

export default async function RootLayout({ children }) {
  return <PostHogProvider>{children}</PostHogProvider>
}
