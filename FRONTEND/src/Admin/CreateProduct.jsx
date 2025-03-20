import React, { useRef } from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { Loader2, X } from "lucide-react";
import { Upload } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import useErrorLogout from "@/hooks/use-error-logout";
import axios from "axios";
import Loader from "@/components/custom/Loader";

const CreateProduct = () => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleErrorLogout } = useErrorLogout();

  const fileInputRef = useRef(null);

  const addColor = () => {
    if (!colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };
  const removeColor = (colorToRemove) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));
      setImages([...images, ...newImages].slice(0, 4));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const stock = e.target.stock.value;
    const category = e.target.category.value;
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !category ||
      colors.length === 0 ||
      images.length === 0
    ) {
      toast.error("All Fields are Required");
      return;
    }
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      price <= 0 ||
      stock <= 0 ||
      category.trim() === ""
    ) {
      toast.error("Fields Cannot be empty");
      return;
    }
    if (images.length < 4) {
      return toast.error("please upload at least 4 images");
    }
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("category", category);
    formdata.append("stock", stock);
    colors.forEach((color) => formdata.append("colors", color));
    images.forEach((image) => formdata.append("images", image.file));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/create-product`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast(response.data.message);
        e.target.reset();
        setImages([]);
        setColors([]);
        setCurrentColor("#000000");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleErrorLogout(error, "Error Uploading Product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  -z-10">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Product</CardTitle>
        <CardDescription>
          Enter the details for the new product to add to you NeoMart
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col lg:flex-row lg:w-[70vw] ">
          <CardContent className="w-full">
            <div className="space-y-2 mt-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="space-y-2 mt-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                rows="4"
                id="description"
                name="description"
                placeholder="Enter product description"
                required
              />
            </div>
            <div className="space-y-2 mt-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                name="price"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="space-y-2 mt-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                name="stock"
                placeholder="0"
                step="1"
                min="0"
                required
              />
            </div>
          </CardContent>
          <CardContent className="w-full">
            <div className="space-y-2 mt-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Headset">Headset</SelectItem>
                  <SelectItem value="Keyboard">Keyboard</SelectItem>
                  <SelectItem value="Mouse">Mouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Colors</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-12 h-12 p-1 rounded-md"
                />
                <Button
                  onClick={addColor}
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Add Color
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center  bg-gray-100 pl-2 py-1 pr-1 rounded-full"
                  >
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="tetx-sm mr-1 dark:text-slate-900">
                      {color}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-6 w-6 p-0 rounded-full cursor-pointer"
                      onClick={() => removeColor(color)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove Color</span>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="images" className="mb-5">
                  Product Images
                </Label>
                <div className="flex flex-wrap gap-4">
                  {images.map((image, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={image.preview}
                        alt={`product img ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove Images</span>
                      </Button>
                    </div>
                  ))}

                  {images.length < 4 && (
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="cursor-pointer w-[100px] h-[100px]"
                      variant="outline"
                    >
                      <Upload className="h-6 w-6" />
                      <span className="sr-only">Upload Image</span>
                    </Button>
                  )}
                </div>
                <Input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Upload upto 4 images. Supported Formats: JPG,PNG,GIF
                </p>
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter className="mt-4">
          <Button type="submit" className="w-full " disabled={isLoading}>
            {isLoading ? <Loader /> : "Add Product"}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default CreateProduct;
