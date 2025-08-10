import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import NavbarAdmin from '../Dashboard-Admin/NavbarAdmin'
import { useEffect,useState } from 'react'
import ChatbotArtisan from '../ChatbotArtisan'


export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information."


  export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch("http://localhost:8000/get-orders");
          const result = await response.json();
          setOrders(result);
          console.log(result);
          
        } catch (error) {
          console.log("Error fetching orders", error);
        }
      }
      fetchOrders();
    }, []);
  
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'fulfilled':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'declined':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  
    const handleOrderClick = (order) => {
      setSelectedOrder(order);
    };
  
    return (
      <div className='main_container'>
        <div className='navbar_container'>
          <NavbarAdmin />
        </div>
        <div className='main_screen'>
        <div className="flex min-h-screen w-full flex-col bg-beige-100">
          <div className="flex flex-col sm:gap-4 px-4 py-4">
            <main className="grid flex-1 items-start gap-4  sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 ">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>This Week</CardDescription>
                      <CardTitle className="text-4xl">₹1,329</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground text-green-400">
                        +25% from last week
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>This Month</CardDescription>
                      <CardTitle className="text-4xl">₹5,329</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground text-green-400">
                        +10% from last month
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Progress value={12} aria-label="12% increase" />
                    </CardFooter>
                  </Card>
                </div>
                <Tabs defaultValue="week">
                  
                  <TabsContent value="week">
                    <Card>
                      <CardHeader className="px-7">
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>Recent orders from your store.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Customer</TableHead>
                              <TableHead className="hidden sm:table-cell">Type</TableHead>
                              <TableHead className="hidden sm:table-cell">Status</TableHead>
                              <TableHead className="hidden md:table-cell">Date</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {orders.map((order) => (
                              <TableRow key={order.id} onClick={() => handleOrderClick(order)} className="cursor-pointer hover:bg-gray-100">
                                <TableCell>
                                  <div className="font-medium">{order.name}</div>
                                  <div className="hidden text-sm text-muted-foreground md:inline">
                                    {order.email}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  Sale
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                                    {order.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {new Date(order.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">{order.amount}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              <div>
                <Card className="overflow-hidden">
                  {selectedOrder ? (
                    <>
                      <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                          <CardTitle className="group flex items-center gap-2 text-lg">
                            Order {selectedOrder.orderId}
                            <Button size="icon" variant="outline" className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
                              <Copy className="h-3 w-3" />
                              <span className="sr-only">Copy Order ID</span>
                            </Button>
                          </CardTitle>
                          <CardDescription>Date: {new Date(selectedOrder.date).toLocaleDateString()}</CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                          <Button size="sm" variant="outline" className="h-8 gap-1">
                            <Truck className="h-3.5 w-3.5" />
                            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Track Order</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="outline" className="h-8 w-8">
                                <MoreVertical className="h-3.5 w-3.5" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Export</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Trash</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                          <div className="font-semibold">Order Details</div>
                          <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Product x <span>{selectedOrder.qauntity}</span>
                              </span>
                              <span>${selectedOrder.amount}</span>
                            </li>
                          </ul>
                          <Separator className="my-2" />
                          <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">Subtotal</span>
                              <span>${selectedOrder.amount.toFixed(2)}</span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                              <span className="text-muted-foreground">Total</span>
                              <span>${selectedOrder.amount.toFixed(2)}</span>
                            </li>
                          </ul>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-3">
                            <div className="font-semibold">Shipping Information</div>
                            <address className="grid gap-0.5 not-italic text-muted-foreground">
                              <span>{selectedOrder.name}</span>
                              <span>{selectedOrder.address}</span>
                            </address>
                          </div>
                          <div className="grid auto-rows-max gap-3">
                            <div className="font-semibold">Billing Information</div>
                            <div className="text-muted-foreground">Same as shipping address</div>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-3">
                          <div className="font-semibold">Customer Information</div>
                          <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                              <dt className="text-muted-foreground">Customer</dt>
                              <dd>{selectedOrder.name}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                              <dt className="text-muted-foreground">Email</dt>
                              <dd>
                                <a href={`mailto:${selectedOrder.email}`}>{selectedOrder.email}</a>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="p-6 text-center flex flex-col justify-center items-center">
                      <img src="/cube.png" alt="" className='w-32 h-32' />
                      <p className="text-muted-foreground">Click on any order to view its details</p>
                    </CardContent>
                  )}
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      {selectedOrder ? (
                        <>
                          Updated <time dateTime={new Date(selectedOrder.date).toISOString()}>
                            {new Date(selectedOrder.date).toLocaleDateString()}
                          </time>
                        </>
                      ) : (
                        'No order selected'
                      )}
                    </div>
                    <Pagination className="ml-auto mr-0 w-auto">
                      <PaginationContent>
                        <PaginationItem>
                          <Button size="icon" variant="outline" className="h-6 w-6">
                            <span className="sr-only">Previous Order</span>
                          </Button>
                        </PaginationItem>
                        <PaginationItem>
                          <Button size="icon" variant="outline" className="h-6 w-6">
                            <span className="sr-only">Next Order</span>
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                </Card>
              </div>
              <ChatbotArtisan />
            </main>
          </div>
        </div>
        </div>
      </div>
    );
  }
  