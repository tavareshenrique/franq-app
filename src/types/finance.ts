export interface Quote {
  id: string
  name: string
  price?: number
  buy?: number
  sell?: number
  points?: number 
  variation: number
  type: "currency" | "stock" | "crypto"
  isFavorite?: boolean 
}
