import React, { useState } from "react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterMenu = () => {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

  const categoryData = {
    trigger: "Category",
    items: ["keyboard", "mouse", "headset"],
  };

  const priceData = {
    trigger: "Price",
    items: [1000, 2000, 3000, 4000],
  };

  return (
    <div className="w-[92.5vw] flex flex-col sm:flex-row justify-between items-center mx-auto my-10 gap-3 sm:gap-0">
      {/* Dropdown Filters*/}
      <div className="flex sm:w-[30%] w-full gap-3">
        {/* category */}
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger id={categoryData.trigger}>
            <SelectValue placeholder={categoryData.trigger} />
          </SelectTrigger>
          <SelectContent
            side="bottom"
            sideOffset={4}
            avoidCollisions={false}
            forceMount
          >
            {categoryData.items.map((item) => (
              <SelectItem key={item} value={item} className="capitalize">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* price */}
        <Select onValueChange={(value) => setPrice(value)}>
          <SelectTrigger id={priceData.trigger}>
            <SelectValue placeholder={priceData.trigger} />
          </SelectTrigger>
          <SelectContent
            side="bottom"
            sideOffset={4}
            avoidCollisions={false}
            forceMount
          >
            {priceData.items.map((item) => (
              <SelectItem key={item} value={item} className="capitalize">
                Less Than {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search Input */}
      <div className="w-full sm:w-[30%]">
        <Input
          id="search"
          className="sm:px-8"
          placeholder="Search Item Here..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterMenu;
