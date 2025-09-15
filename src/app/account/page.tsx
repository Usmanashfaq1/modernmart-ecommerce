



// app/account/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/supabaseServer"
import { getUserById } from "@/respositories/userRespository"
import { redirect } from "next/navigation"
import { logout } from "@/app/login/actions"

// Mock orders data (you'll replace with real data)
const mockOrders = [
  {
    id: 1,
    orderNumber: "UT-2024-001",
    status: "delivered",
    total: 149.98,
    items: 3,
    date: "2024-01-15",
    estimatedDelivery: "2024-01-18",
    items_preview: ["Premium Cotton T-Shirt", "Urban Denim Jacket"]
  },
  {
    id: 2,
    orderNumber: "UT-2024-002", 
    status: "shipped",
    total: 79.99,
    items: 1,
    date: "2024-01-20",
    estimatedDelivery: "2024-01-23",
    items_preview: ["Classic Sneakers"]
  },
  {
    id: 3,
    orderNumber: "UT-2024-003",
    status: "processing",
    total: 199.99,
    items: 2,
    date: "2024-01-22",
    estimatedDelivery: "2024-01-26",
    items_preview: ["Leather Crossbody Bag", "Designer Sunglasses"]
  }
]

function getStatusColor(status: string) {
  switch (status) {
    case 'delivered': return 'default'
    case 'shipped': return 'secondary'
    case 'processing': return 'outline'
    case 'cancelled': return 'destructive'
    default: return 'outline'
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'delivered': return CheckCircle
    case 'shipped': return Truck
    case 'processing': return Clock
    default: return Package
  }
}

async function AccountPage() {
  // Get current user from Supabase
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    console.log('session do not exist');
    redirect('/login')
  }

  console.log("Checking user in DB:", user.id)
const userProfile = await getUserById(user.id)
console.log("DB result:", userProfile)

  // // Get user profile from your database
  // const userProfile = await getUserById(user.id)
  
  
  if (!userProfile) {
    console.log('user profile do not exist!');
    // Handle case where user exists in Supabase but not in your DB
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Account</h1>
              <p className="text-muted-foreground">
                Welcome back, {userProfile.name || 'there'}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/products">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{userProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                    <Badge variant="secondary" className="mt-2">
                      {userProfile.role === 'ADMIN' ? 'Administrator' : 'Customer'}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <nav className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start bg-primary/5 text-primary"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/account/orders">
                      <Package className="h-4 w-4 mr-3" />
                      Orders
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/account/wishlist">
                      <Heart className="h-4 w-4 mr-3" />
                      Wishlist
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/account/settings">
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>
                  </Button>
                </nav>

                <Separator className="my-6" />

                <form action={logout}>
                  <Button 
                    variant="ghost" 
                    type="submit"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{userProfile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">
                          {new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium text-muted-foreground">Not provided</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium text-muted-foreground">Not provided</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/account/settings">
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/20 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockOrders.length}</p>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-950/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {mockOrders.filter(order => order.status === 'delivered').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/20 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        ${mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Recent Orders
                </CardTitle>
                <Button variant="outline" asChild>
                  <Link href="/account/orders">View All Orders</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => {
                    const StatusIcon = getStatusIcon(order.status)
                    return (
                      <Card key={order.id} className="border-l-4 border-l-primary/20">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3">
                                <h4 className="font-semibold">Order {order.orderNumber}</h4>
                                <Badge variant={getStatusColor(order.status)} className="capitalize">
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {order.status}
                                </Badge>
                              </div>
                              
                              <div className="text-sm text-muted-foreground space-y-1">
                                <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                                <p>{order.items} item{order.items > 1 ? 's' : ''} • ${order.total}</p>
                                <p className="truncate">
                                  {order.items_preview.join(", ")}
                                  {order.items > order.items_preview.length && "..."}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col md:items-end space-y-2">
                              <div className="text-right">
                                <p className="font-semibold text-lg">${order.total}</p>
                                {order.status === 'shipped' && (
                                  <p className="text-sm text-muted-foreground">
                                    Arrives {new Date(order.estimatedDelivery).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/account/orders/${order.id}`}>
                                    View Details
                                  </Link>
                                </Button>
                                {order.status === 'delivered' && (
                                  <Button variant="outline" size="sm">
                                    Reorder
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {mockOrders.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start shopping to see your orders here
                    </p>
                    <Button asChild>
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2" asChild>
                    <Link href="/account/orders">
                      <Package className="h-6 w-6" />
                      <span>Track Orders</span>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2" asChild>
                    <Link href="/account/wishlist">
                      <Heart className="h-6 w-6" />
                      <span>Wishlist</span>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2" asChild>
                    <Link href="/account/settings">
                      <Settings className="h-6 w-6" />
                      <span>Account Settings</span>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2" asChild>
                    <Link href="/products">
                      <ShoppingBag className="h-6 w-6" />
                      <span>Shop Now</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage