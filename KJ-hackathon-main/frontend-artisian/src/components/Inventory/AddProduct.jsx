import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Upload } from 'lucide-react';
import NavbarAdmin from '../Dashboard-Admin/NavbarAdmin'; // Adjust the import path as necessary
import { Button } from '../ui/button';

import {
    Card,
    CardContent,
    CardDescription,
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
import ChatbotArtisan from '../ChatbotArtisan';


export function AddProduct() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            desc: '',
            stock: '',
            category: '',
            price: '',
            threshold: '',
            seller_name: '',
            status: '',
            images: []
        }
    });
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (e, onChange) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setImages(prevImages => {
            const updatedImages = [...prevImages, ...newImages].slice(0, 3);
            onChange(updatedImages.map(img => img.file)); // Update form value
            return updatedImages;
        });

        if (!selectedImage && newImages.length > 0) {
            setSelectedImage(newImages[0].preview);
        }
    };


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();

            // Append non-image data
            Object.keys(data).forEach(key => {
                if (key !== 'images') {
                    formData.append(key, data[key]);
                }
            });

            // Handle image uploads
            if (data.images && data.images.length > 0) {
                console.log('Images array:', data.images);
                data.images.forEach((image, index) => {
                    if (image instanceof File) {
                        formData.append(`image${index + 1}`, image);
                        console.log(`Appended image${index + 1}:`, image.name, image.type, image.size);
                    } else {
                        console.warn(`Image at index ${index} is not a File object:`, image);
                    }
                });
            } else {
                console.warn('No images found in data.images');
            }

            console.log('FormData contents:');
            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(key, value.name, value.type, value.size);
                } else {
                    console.log(key, value);
                }
            }


            const response = await fetch('http://localhost:8000/create-product', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };



    return (

        <div className='main_container'>
            <div className='navbar_container'>
                <NavbarAdmin />
            </div>
            <div className=''>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-beige-100">
                    <div className="py-4">
                        <main className="">
                            <div className="mx-auto grid max-w-[70rem] flex-1 auto-rows-max gap-4 ">
                                <div className="flex items-center gap-4">
                                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold  sm:grow-0">
                                        Add Product
                                    </h1>
                                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                        <Button type="button" variant="outline" size="sm">
                                            Discard
                                        </Button>
                                        <Button type="submit" size="sm" disabled={loading}>
                                            {loading ? 'Adding...' : 'Add Product'}
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                        <Card className="">
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
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <SelectTrigger id="category" aria-label="Select category">
                                                                        <SelectValue placeholder="Select category" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="ceramics">Ceramics</SelectItem>
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
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                                    {selectedImage ? (
                                                        <img
                                                            alt="Selected product image"
                                                            className="aspect-square w-full rounded-md object-cover"
                                                            height="300"
                                                            src={selectedImage}
                                                            width="300"
                                                        />
                                                    ) : (
                                                        <div className="aspect-square w-full rounded-md border-2 border-dashed flex items-center justify-center text-gray-400">
                                                            No image selected
                                                        </div>
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
                                                                            onChange={(e) => handleImageUpload(e, field.onChange)}
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
                                    <Button type="button" variant="outline" size="sm">
                                        Discard
                                    </Button>
                                    <Button type="submit" size="sm" disabled={loading}>
                                        {loading ? 'Adding...' : 'Add Product'}
                                    </Button>
                                </div>
                            </div>
                            
                        </main>
                    </div>
                </form>
                
                <ChatbotArtisan />
            </div>
        </div>

    );
}