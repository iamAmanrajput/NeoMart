import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";

const AllProducts = () => {
  return (
    <div className="mx-auto px-4 sm:px-8 -z-10">
      <h1 className="font-bold text-3xl mb-8">Our Products</h1>
      <div className="mb-8">
        <form className="flex gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="search">Search Products</Label>
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
            <Label htmlFor="category">Categrory</Label>
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
    </div>
  );
};

export default AllProducts;
