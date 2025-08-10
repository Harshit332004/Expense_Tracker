import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Upload } from 'lucide-react';
import NavbarAdmin from '../Dashboard-Admin/NavbarAdmin';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ChatbotArtisan from '../ChatbotArtisan';

export function Product() {
    const { control, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState('');
    const [images, setImages] = useState([]);

    // Use the product data from location state, or use a default empty object
    const product = location.state?.product || {};
    console.log("Product",product);
    

    useEffect(() => {
        // Populate form fields with product data
        setValue('name', product.name || '');
        setValue('desc', product.desc || '');
        setValue('price', product.price || '');
        setValue('stock', product.stock || '');
        setValue('threshold', product.threshold || '');
        setValue('category', product.category || '');
        setValue('status', product.status || '');
        setValue('seller_name', product.seller_name || '');
        setValue('pid',product.pid)

        // Set up images
        if (product.images && product.images.length > 0) {
            setSelectedImage(product.images[0]);
            setImages(product.images.map(url => ({ preview: url })));
        }
    }, [product, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        console.log("Saving changes:", data);
        delete data.images
        console.log(data);
        
        try {
            const response = await fetch('http://localhost:3000/edit-product',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            console.log(result);
            navigate('/admin/inventory')
            
        } catch (error) {
            console.log("Error in Editing image",error);  
        }
        setLoading(false);
    };

    

    return (
        <div className="main_container">
            <div className="navbar_container">
                <NavbarAdmin />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col bg-beige-100">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
                        <div className="mx-auto grid max-w-[65rem] flex-1 auto-rows-max gap-4">
                            <div className="flex items-center gap-4">
                                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                    Save Changes
                                </h1>
                                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                    <Button type="button" variant="outline" size="sm" onClick={() => navigate('/admin/inventory')}>
                                        Discard
                                    </Button>
                                    <Button type="submit" size="sm" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Product Details</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Controller
                                                        name="name"
                                                        control={control}
                                                        render={({ field }) => <Input {...field} id="name" type="text" className="w-full" />}
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="desc">Description</Label>
                                                    <Controller
                                                        name="desc"
                                                        control={control}
                                                        render={({ field }) => <Textarea {...field} id="desc" className="min-h-32" />}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Product Details</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="price">Price</Label>
                                                    <Controller
                                                        name="price"
                                                        control={control}
                                                        render={({ field }) => <Input {...field} type="text" id="price" placeholder="Enter price" />}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="stock">Quantity Available</Label>
                                                    <Controller
                                                        name="stock"
                                                        control={control}
                                                        render={({ field }) => <Input {...field} type="number" id="stock" placeholder="Enter quantity available" />}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="threshold">Low Stock Threshold</Label>
                                                    <Controller
                                                        name="threshold"
                                                        control={control}
                                                        render={({ field }) => <Input {...field} type="number" id="threshold" placeholder="Enter low stock threshold" />}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Product Category</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-center items-center">
                                                <div className="grid gap-3">
                                                    <Controller
                                                        name="category"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select onValueChange={field.onChange} value={field.value}>
                                                                <SelectTrigger id="category" aria-label="Select category">
                                                                    <SelectValue placeholder="Select category" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="sculptures">Sculptures</SelectItem>
                                                                    <SelectItem value="jewelery">Jewelery</SelectItem>
                                                                    <SelectItem value="woodworking">Woodworking</SelectItem>
                                                                    <SelectItem value="paintings">Paintings</SelectItem>
                                                                    <SelectItem value="marbles">Marbles</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Product Status</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="status">Status</Label>
                                                    <Controller
                                                        name="status"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select onValueChange={field.onChange} value={field.value}>
                                                                <SelectTrigger id="status" aria-label="Select status">
                                                                    <SelectValue placeholder="Select status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="draft">Draft</SelectItem>
                                                                    <SelectItem value="active">Active</SelectItem>
                                                                    <SelectItem value="archived">Archived</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="overflow-hidden">
                                        <CardHeader>
                                            <CardTitle>Product Images</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-2">
                                                {selectedImage && (
                                                    <img
                                                        alt="Selected product image"
                                                        className="aspect-square w-full rounded-md object-cover"
                                                        height="300"
                                                        src={selectedImage}
                                                        width="300"
                                                    />
                                                )}
                                                <div className="grid grid-cols-3 gap-2">
                                                    {images.map((image, index) => (
                                                        <button key={index} onClick={() => setSelectedImage(image.preview)}>
                                                            <img
                                                                alt={`Product image ${index + 1}`}
                                                                className="aspect-square w-full rounded-md object-cover"
                                                                height="84"
                                                                src={image.preview}
                                                                width="84"
                                                            />
                                                        </button>
                                                    ))}
                                                    {images.length < 3 && (
                                                        <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                                                            <Controller
                                                                name="images"
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        
                                                                        multiple
                                                                        accept="image/*"
                                                                    />
                                                                )}
                                                            />
                                                            <Upload className="h-4 w-4 text-muted-foreground" />
                                                            <span className="sr-only">Upload</span>
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Seller Name</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-3">
                                                <Label htmlFor="seller_name">Seller Name</Label>
                                                <Controller
                                                    name="seller_name"
                                                    control={control}
                                                    render={({ field }) => <Input {...field} id="seller_name" type="text" className="w-full" />}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 md:hidden">
                                <Button type="button" variant="outline" size="sm" onClick={() => navigate('/admin/inventory')}>
                                    Discard
                                </Button>
                                <Button type="submit" size="sm" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                        <ChatbotArtisan />
                    </main>
                </div>
            </form>
        </div>
    );
}