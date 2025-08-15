"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { EXPENSE_CATEGORIES } from "@/types/expense"
import { Filter, X, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export interface FilterOptions {
  searchTerm: string
  categories: string[]
  dateRange: {
    from: Date | null
    to: Date | null
  }
  amountRange: {
    min: number | null
    max: number | null
  }
}

interface AdvancedFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  onReset: () => void
}

export function AdvancedFilters({ filters, onFiltersChange, onReset }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateFilters = (updates: Partial<FilterOptions>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    updateFilters({ categories: newCategories })
  }

  const hasActiveFilters =
    filters.searchTerm ||
    filters.categories.length > 0 ||
    filters.dateRange.from ||
    filters.dateRange.to ||
    filters.amountRange.min !== null ||
    filters.amountRange.max !== null

  return (
    <div className="space-y-4">
      {/* Quick Search */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search expenses..."
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="bg-transparent"
          />
        </div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  !
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0 bg-background border shadow-lg" align="end">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="pb-1 px-3 pt-3 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-semibold text-foreground">Filters</CardTitle>
                  {hasActiveFilters && (
                    <Button variant="outline" size="sm" onClick={onReset} className="text-xs h-6 px-2">
                      <X className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2 px-3 pb-3">
                {/* Categories */}
                <div>
                  <Label className="text-xs font-medium mb-2 block">Categories</Label>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {EXPENSE_CATEGORIES.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                          className="h-3 w-3 flex-shrink-0"
                        />
                        <Label htmlFor={category} className="text-xs cursor-pointer leading-none flex-1 min-w-0">
                          {category.replace(" & ", " ")}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <Label className="text-xs font-medium mb-2 block">Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground block">From</Label>
                      <input
                        type="date"
                        value={filters.dateRange.from ? format(filters.dateRange.from, "yyyy-MM-dd") : ""}
                        onChange={(e) =>
                          updateFilters({
                            dateRange: { 
                              ...filters.dateRange, 
                              from: e.target.value ? new Date(e.target.value) : null 
                            },
                          })
                        }
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground block">To</Label>
                      <input
                        type="date"
                        value={filters.dateRange.to ? format(filters.dateRange.to, "yyyy-MM-dd") : ""}
                        onChange={(e) =>
                          updateFilters({
                            dateRange: { 
                              ...filters.dateRange, 
                              to: e.target.value ? new Date(e.target.value) : null 
                            },
                          })
                        }
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Amount Range */}
                <div>
                  <Label className="text-xs font-medium mb-2 block">Amount (₹)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground block">Min</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={filters.amountRange.min || ""}
                        onChange={(e) =>
                          updateFilters({
                            amountRange: {
                              ...filters.amountRange,
                              min: e.target.value ? Number.parseFloat(e.target.value) : null,
                            },
                          })
                        }
                        className="bg-transparent h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground block">Max</Label>
                      <Input
                        type="number"
                        placeholder="999999"
                        value={filters.amountRange.max || ""}
                        onChange={(e) =>
                          updateFilters({
                            amountRange: {
                              ...filters.amountRange,
                              max: e.target.value ? Number.parseFloat(e.target.value) : null,
                            },
                          })
                        }
                        className="bg-transparent h-9 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(category)} />
            </Badge>
          ))}
          {filters.dateRange.from && (
            <Badge variant="secondary" className="gap-1">
              From: {format(filters.dateRange.from, "MMM dd, yyyy")}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  updateFilters({
                    dateRange: { ...filters.dateRange, from: null },
                  })
                }
              />
            </Badge>
          )}
          {filters.dateRange.to && (
            <Badge variant="secondary" className="gap-1">
              To: {format(filters.dateRange.to, "MMM dd, yyyy")}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  updateFilters({
                    dateRange: { ...filters.dateRange, to: null },
                  })
                }
              />
            </Badge>
          )}
          {filters.amountRange.min !== null && (
            <Badge variant="secondary" className="gap-1">
              Min: ₹{filters.amountRange.min}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  updateFilters({
                    amountRange: { ...filters.amountRange, min: null },
                  })
                }
              />
            </Badge>
          )}
          {filters.amountRange.max !== null && (
            <Badge variant="secondary" className="gap-1">
              Max: ₹{filters.amountRange.max}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  updateFilters({
                    amountRange: { ...filters.amountRange, max: null },
                  })
                }
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
