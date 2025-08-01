import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-sage-900 mb-8">
        <Skeleton className="h-10 w-64" />
      </h1>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">
            <Skeleton className="h-6 w-24" />
          </TabsTrigger>
          <TabsTrigger value="users">
            <Skeleton className="h-6 w-20" />
          </TabsTrigger>
          <TabsTrigger value="products">
            <Skeleton className="h-6 w-24" />
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-10 w-1/2" />
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <Skeleton className="h-8 w-48 mb-4" />
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-8 w-24 ml-4" />
          </Card>
        ))}
      </div>
    </div>
  )
}
