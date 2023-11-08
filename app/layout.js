import { Inter } from 'next/font/google'
import './globals.css'

//Theme Component
import Providers from './components/theme/Providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo App',
  description: 'Created by Anthony Clayton',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}><Providers>{children} </Providers>
      </body>
    </html>
  )
}
