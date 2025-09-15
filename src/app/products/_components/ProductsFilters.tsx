"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Grid3X3, List } from "lucide-react"

export default function ProductsFilters({ count }: { count: number }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search products..." 
            className="pl-10"
          />
        </div>

        {/* Filters + View Options */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {count} products
          </p>
        </div>
      </div>
    </div>
  )
}
