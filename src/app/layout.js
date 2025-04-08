import './globals.css'
import { Inter } from 'next/font/google'
import { FiCheckSquare } from 'react-icons/fi'

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: 'TodoMaster | Organize Your Tasks',
  description: 'A modern todo application to manage your daily tasks efficiently',
  keywords: 'todo, tasks, productivity, organization, task management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <header className="bg-black text-white shadow-md">
          <div className="container mx-auto py-4 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 text-white">
                  <FiCheckSquare size={28} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">TodoMaster</h1>
                  <p className="text-gray-300 text-sm hidden sm:block">Organize your tasks efficiently</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="hover:bg-gray-800 rounded-md py-1 px-3 text-sm transition duration-150 hidden md:block">
                  Help
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-black text-gray-400 py-6 mt-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <FiCheckSquare size={20} className="mr-2" />
                  <span className="font-semibold text-white">TodoMaster</span>
                </div>
                <p className="text-sm mt-1">Keep your tasks organized, anytime, anywhere.</p>
              </div>
              
              <div className="text-sm">
                &copy; {new Date().getFullYear()} TodoMaster. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}