import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

export default function SellersLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-4 mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="flex flex-col items-center p-6">
            <Avatar className="w-24 h-24 mb-4 border-2 border-terracotta-400">
              <Skeleton className="w-full h-full rounded-full" />
            </Avatar>
            <div className="text-center mb-2">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="text-center flex-1">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <Skeleton className="h-4 w-1/3 mb-4" />
            </div>
            <Skeleton className="h-10 w-32" />
          </Card>
        ))}
      </div>
    </div>
  )
}
