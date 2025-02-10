import { Users, ShoppingBag, Star, Truck } from "lucide-react"

const stats = [
  {
    label: "Happy Customers",
    value: "1,000+",
    icon: Users,
  },
  {
    label: "Products Delivered",
    value: "3,000+",
    icon: ShoppingBag,
  },
  {
    label: "5-Star Reviews",
    value: "500+",
    icon: Star,
  },
  {
    label: "Cities Covered",
    value: "12",
    icon: Truck,
  },
]

export function StatsSection() {
  return (
    <section className="container py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

