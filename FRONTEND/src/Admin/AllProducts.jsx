import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const AllProducts = () => {
  return (
    <div className="mx-auto px-4 sm:px-8 -z-10">
      <h1 className="font-bold text-3xl mb-8">Our Products</h1>
      <div className="mb-8">
        <form className="flex gap-4 items-end sm:w-[60vw] md:w-[70vw]">
          <div className="flex-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="search"
            >
              Search Products
            </label>
            <div className="relative">
              <Input
                type="text"
                id="search"
                placeholder="sort by name and description"
                className="pl-10"
              />
              <Search
                size="20"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="w-48">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="category"
            >
              Categrory
            </label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="headset">Headset</SelectItem>
                <SelectItem value="keyword">Keyboard</SelectItem>
                <SelectItem value="mouse">Mouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto sm:mx-0">
        <Card className="flex flex-col w-full sm:w-[22vw] pt-0">
          <div className="h-[12rem] relative">
            <img
              src="https://images.pexels.com/photos/29782661/pexels-photo-29782661/free-photo-of-beautiful-kyoto-yasaka-pagoda-in-historic-district.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              className="rounded-t-lg w-full h-full object-cover"
            />
          </div>
          <CardContent className="flex-grow">
            <h2 className="text-lg font-semibold mb-2">Mac Laptop</h2>
            <p className="text-sm text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              quasi!
            </p>
            <p className="text-lg font-bold">₹500.00</p>
          </CardContent>
          <CardFooter className=" pt-0 flex justify-between">
            <Button variant="outline">
              <Edit className="mr-2 h-4 s-4" /> Edit
            </Button>
            <Button>Blacklist Product</Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog>
        <DialogContent className="sm-max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 items-center">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" />
              </div>

              <div className="grid gap-4 items-center">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" type="text" />
              </div>

              <div className="grid gap-4 items-center">
                <Label htmlFor="price">price</Label>
                <Input id="price" name="price" type="number" />
              </div>

              <div className="grid gap-4 items-center">
                <Label htmlFor="category">Category</Label>
                <Select name="category">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="headset">Headset</SelectItem>
                    <SelectItem value="keyboard">keyboard</SelectItem>
                    <SelectItem value="mouse">Mouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProducts;
