"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Palette } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "./ui/badge"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-10 h-10">
        <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
      </Button>
    )
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-4 w-4" />
      case "system":
        return <Monitor className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case "dark":
        return "Dark"
      case "system":
        return "Auto"
      default:
        return "Light"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="h-10 gap-2 px-3 border-gray-300 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-gray-400 dark:bg-gray-800/50 dark:border-gray-600 dark:hover:bg-gray-800 transition-all duration-200 group"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute top-0 left-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            <span className="text-sm font-medium hidden sm:inline-block">
              {getThemeLabel()}
            </span>
            <Palette className="h-3 w-3 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200 transition-colors" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:backdrop-blur-sm"
      >
        <div className="p-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Theme Preference
          </h3>
        </div>
        
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="flex items-center gap-3 px-3 py-2.5 cursor-pointer group hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Sun className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Light Mode
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Bright and clean
            </div>
          </div>
          {theme === "light" && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
              Active
            </Badge>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center gap-3 px-3 py-2.5 cursor-pointer group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center">
            <Moon className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
              Dark Mode
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Easy on the eyes
            </div>
          </div>
          {theme === "dark" && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
              Active
            </Badge>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center gap-3 px-3 py-2.5 cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center">
            <Monitor className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300">
              System
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Follows your OS
            </div>
          </div>
          {theme === "system" && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
              Active
            </Badge>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}