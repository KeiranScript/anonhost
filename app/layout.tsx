import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Anonhost',
  description: 'Anonymously upload your files. For free. For ever.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#1a1b26] text-[#a9b1d6]">
          <nav className="bg-[#24283b] p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[#7aa2f7]">Anonhost</h1>
              <button className="text-[#7aa2f7]" />
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
}
