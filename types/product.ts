export type ProductCategory = 'automobile' | 'tractor' | 'electric-bike'

export type Condition = 'Excellent' | 'Good' | 'Fair'

export interface BaseProduct {
  id: string
  slug: string
  category: ProductCategory
  name: string
  brand: string
  model: string
  year: number
  price: number
  condition: Condition
  description: string
  features: string[]
  imageAlt: string
  imagePlaceholder: string
  /** When set, this image is shown instead of the placeholder (e.g. /images/inventory/slug/photo.jpg) */
  image?: string
  /** All gallery images for carousel; first is primary. When set, card shows swipeable/clickable carousel. */
  images?: string[]
}

export interface Automobile extends BaseProduct {
  category: 'automobile'
  bodyType: 'Sedan' | 'SUV' | 'Truck' | 'Van' | 'Bus' | 'Hatchback' | 'Coupe'
  mileage: number
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'
  transmission: 'Automatic' | 'Manual'
  engineSize: string
}

export interface Tractor extends BaseProduct {
  category: 'tractor'
  horsepower: number
  hoursUsed: number
  driveType: '2WD' | '4WD'
  ptoType: string
  liftCapacity: string
}

export interface ElectricBike extends BaseProduct {
  category: 'electric-bike'
  motorPower: number
  batteryCapacity: string
  range: number
  topSpeed: number
  chargeTime: string
  bikeType: 'City' | 'Mountain' | 'Cargo' | 'Folding' | 'Fat Tire'
}

export type Product = Automobile | Tractor | ElectricBike
