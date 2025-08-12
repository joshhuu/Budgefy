"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { EXPENSE_CATEGORIES } from "@/types/expense"
import { Filter, X, CalendarIcon, DollarSign } from "lucide-react"
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
          <PopoverContent className="w-96 p-0" align="end">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Advanced Filters</CardTitle>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={onReset}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Categories */}
                <div>
                  <Label className="text-sm font-medium">Categories</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {EXPENSE_CATEGORIES.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={category} className="text-xs cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <Label className="text-sm font-medium">Date Range</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal bg-transparent",
                            !filters.dateRange.from && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange.from ? format(filters.dateRange.from, "MMM dd") : "From"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange.from || undefined}
                          onSelect={(date) =>
                            updateFilters({
                              dateRange: { ...filters.dateRange, from: date || null },
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal bg-transparent",
                            !filters.dateRange.to && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange.to ? format(filters.dateRange.to, "MMM dd") : "To"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange.to || undefined}
                          onSelect={(date) =>
                            updateFilters({
                              dateRange: { ...filters.dateRange, to: date || null },
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Amount Range */}
                <div>
                  <Label className="text-sm font-medium">Amount Range</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.amountRange.min || ""}
                        onChange={(e) =>
                          updateFilters({
                            amountRange: {
                              ...filters.amountRange,
                              min: e.target.value ? Number.parseFloat(e.target.value) : null,
                            },
                          })
                        }
                        className="pl-8 bg-transparent"
                      />
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.amountRange.max || ""}
                        onChange={(e) =>
                          updateFilters({
                            amountRange: {
                              ...filters.amountRange,
                              max: e.target.value ? Number.parseFloat(e.target.value) : null,
                            },
                          })
                        }
                        className="pl-8 bg-transparent"
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
              From: {format(filters.dateRange.from, "MMM dd")}
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
              To: {format(filters.dateRange.to, "MMM dd")}
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
              Min: ${filters.amountRange.min}
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
              Max: ${filters.amountRange.max}
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
