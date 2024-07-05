"use client"
import { createContext, useState } from "react"

type SearchContextProvider = {
  children: React.ReactNode
}

type TSearchContext = {
  searchQuery: string;
  handleChangeSearchQuery: (value: string) => void;
}

export const SearchContext = createContext<TSearchContext | null>(null)

export default function SearchContextProvider({ children }: SearchContextProvider) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeSearchQuery = (value: string) => {
    setSearchQuery(value)
  }


  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeSearchQuery
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
