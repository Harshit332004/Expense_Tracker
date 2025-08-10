import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NavbarAdmin from "../Dashboard-Admin/NavbarAdmin";
import ChatbotArtisan from "../ChatbotArtisan";

// Constants
const STATUS_COLORS = {
  active: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
};

const CATEGORY_COLORS = {
  ceramics: "bg-green-100 text-green-800",
  jewelery: "bg-yellow-100 text-yellow-800",
  woodworking: "bg-orange-800 text-white",
  paintings: "bg-red-100 text-red-800",
  marbles: "bg-teal-100 text-teal-800",
};

// Subcomponents
const ProductImage = ({ src }) => (
  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
    <img
      src={src}
      alt="Product"
      className="h-10 w-10 rounded-full object-cover"
    />
  </div>
);

const StatusBadge = ({ status }) => (
  <Badge className={`${STATUS_COLORS[status]} font-semibold`} variant="outline">
    {status}
  </Badge>
);

const CategoryBadge = ({ category }) => (
  <Badge
    className={`${CATEGORY_COLORS[category]} font-semibold`}
    variant="outline"
  >
    {category}
  </Badge>
);

const ActionsDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size="sm" variant="ghost">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem className="text-red-600">
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const ProductRow = ({ product }) => (
  <TableRow key={product.id} className="cursor-pointer hover:bg-gray-100">
    <TableCell>
      <Link to="/admin/product" state={{ product }}>
        <ProductImage src={product.images[0]} />
      </Link>
    </TableCell>
    <TableCell className="font-medium">{product.name}</TableCell>
    <TableCell>
      <StatusBadge status={product.status} />
    </TableCell>
    <TableCell>₹{product.price}</TableCell>
    <TableCell>{product.sales}</TableCell>
    <TableCell>
      <CategoryBadge category={product.category} />
    </TableCell>
    <TableCell>
      <ActionsDropdown />
    </TableCell>
  </TableRow>
);

// Main component
export function Inventory() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:8000/all_products");
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="main_container">
      <div className="flex min-h-screen w-full flex-col bg-beige-100">
        <div className="navbar_container">
          <NavbarAdmin />
        </div>
        <div className="main_screen">
          <div className="flex flex-col gap-4 p-6">
            <div className="flex justify-end pr-2">
              <Button
                className="bg-orange-800 text-white hover:bg-orange-900"
                onClick={() => navigate("/admin/add-product")}
              >
                Add Product
              </Button>
            </div>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Local Artisan Products
                </CardTitle>
                <CardDescription>
                  Manage your artisanal products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[100px]">Price</TableHead>
                      <TableHead className="w-[120px]">Total Sales</TableHead>
                      <TableHead className="w-[150px]">Category</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products?.map((product) => (
                      <ProductRow key={product.id} product={product} />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-gray-500">
                  Showing <strong>{products?.length}</strong> products
                </div>
              </CardFooter>
            </Card>
            <ChatbotArtisan />
          </div>
        </div>
      </div>
    </div>
  );
}
