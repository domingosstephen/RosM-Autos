export interface Port {
  name: string
  country: string
  transitTime: string
}

export interface ShippingRegion {
  id: string
  name: string
  description: string
  ports: Port[]
  documents: string[]
  costRange: string
  notes: string
}
