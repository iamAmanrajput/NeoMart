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

const CreateProduct = () => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleImageUpload = (e) => {};

  return (
    <div className="w-full  -z-10">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Product</CardTitle>
        <CardDescription>
          Enter the details for the new product to add to you NeoMart
        </CardDescription>
      </CardHeader>
      <form className="mt-4">
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
                  <SelectItem value="headset">Headset</SelectItem>
                  <SelectItem value="keyboard">Keyboard</SelectItem>
                  <SelectItem value="mouse">Mouse</SelectItem>
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
                  <div className="relative">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1679177183572-a4056053b8a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D"
                      alt={`product img ${1}`}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeImage(0)}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove Images</span>
                    </Button>
                  </div>
                  {images.length < 4 && (
                    <Button
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
      </form>
      <CardFooter className="mt-4">
        <Button type="submit" className="w-full " disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animated-spin" />}
          {isLoading ? "Adding Product..." : "Add Product"}
        </Button>
      </CardFooter>
    </div>
  );
};

export default CreateProduct;
