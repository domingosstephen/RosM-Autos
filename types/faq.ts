export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  id: string
  title: string
  items: FAQItem[]
}
