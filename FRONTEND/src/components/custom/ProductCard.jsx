import React from "react";
import { starGenerator } from "@/constants/Helper";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ShoppingBag, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  name = "Product Title",
  price = 2000,
  rating = 2.5,
  image = {
    url: "https://images.pexels.com/photos/19351991/pexels-photo-19351991/free-photo-of-black-and-white-bike-helmet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: "22",
  },
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-zinc-900 border border-border/50 
                 w-full overflow-hidden rounded-3xl shadow-lg hover:shadow-xl 
                 transition-all duration-500 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-3xl w-full">
        <motion.img
          src={image.url}
          alt={name}
          className="object-cover w-full h-[16rem] group-hover:scale-110 transition-transform duration-700"
          whileHover={{ scale: 1.05 }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm"
          >
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {rating?.toFixed(1)}
          </Badge>
        </div>
      </div>

      {/* Product Info */}
      <motion.div initial={{ y: 0 }} className="p-6 space-y-4">
        <div className="space-y-2">
          <h3
            className="font-semibold text-lg text-foreground group-hover:text-primary 
                       transition-colors duration-300 line-clamp-2"
          >
            {name?.length > 25 ? name.slice(0, 28) + "..." : name}
          </h3>

          <div className="flex items-center justify-between">
            {/* Rating */}
            <div className="flex items-center space-x-1">
              {starGenerator(rating)}
              <span className="text-sm text-muted-foreground ml-2">
                ({rating.toFixed(1)})
              </span>
            </div>

            {/* Price */}
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">
                ₹{price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={() => navigate(`/product/${name.split(" ").join("-")}`)}
            className="flex-1 group/btn cursor-pointer"
            size="sm"
          >
            <motion.div
              whileHover={{ x: 2 }}
              className="flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              View Product
            </motion.div>
          </Button>
        </div>
      </motion.div>

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 rounded-3xl 
                   bg-gradient-to-r from-primary/5 via-transparent to-primary/5 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
    </motion.div>
  );
};

export default ProductCard;
