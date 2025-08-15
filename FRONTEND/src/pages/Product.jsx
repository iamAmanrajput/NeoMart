import React, { useEffect, useState } from "react";
import { starGenerator } from "@/constants/Helper";
import { Circle, CreditCard, Minus, Plus, ShoppingCart } from "lucide-react";
import { Colors } from "@/constants/colors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReviewComponent from "@/components/custom/ReviewComponent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import useRazorpay from "@/hooks/use-razorpay";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Product = () => {
  const { productName } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { generatePayment, verifyPayment } = useRazorpay();

  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [productColor, setProductColor] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [purchaseProduct, setPurchaseProduct] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchProductByName = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/get-product/${productName}`
        );
        const { data } = res.data;
        setProduct(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load product");
      }
    };
    fetchProductByName();
  }, [productName]);

  const calculateEmi = (price) => Math.round(price / 6);

  const checkAvailability = async () => {
    if (pincode.trim() === "") {
      setAvailabilityMessage("Please enter a valid pincode");
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/pincode/${pincode}`
      );
      const data = res.data;
      setAvailabilityMessage(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error checking pincode");
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      toast.error("Please login to add items to cart");
      return;
    }
    if (productColor === "") {
      toast.error("Please select a color");
      return;
    }
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: productQuantity,
        image: product.images[0].url,
        color: productColor,
        stock: product.stock,
        blacklisted: product.blacklisted,
      })
    );
    setProductQuantity(1);
    toast.success("Product added to cart");
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in first to purchase this product");
      navigate("/login");
      return;
    }
    if (productQuantity > product.stock) {
      toast.error("Product out of stock");
      return;
    }
    if (product.blacklisted) {
      toast.error("Product isn't available for purchase");
      return;
    }
    if (!productColor) {
      toast.error("Please select a color");
      return;
    }

    const order = await generatePayment(product.price * productQuantity);
    await verifyPayment(
      order,
      [{ id: product._id, quantity: productQuantity, color: productColor }],
      address
    );
    setPurchaseProduct(false);
  };

  return (
    <div>
      <main className="w-[92.5vw] lg:w-[70vw] flex flex-col sm:flex-row gap-10 mx-auto my-10">
        {/* Left Side Images */}
        <motion.div
          className="grid sm:w-[50%] gap-3"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <motion.img
            key={selectedImage}
            src={product?.images?.[selectedImage]?.url}
            className="w-full lg:h-[30rem] rounded-xl object-cover border dark:border-none shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
          />
          <div className="grid grid-cols-4 gap-3">
            {product?.images?.map(({ url, id }, index) => (
              <motion.img
                key={id}
                src={url}
                onClick={() => setSelectedImage(index)}
                className={`rounded-xl cursor-pointer border dark:border-none transition-all duration-300 ${
                  index === selectedImage ? "ring-2 ring-primary" : ""
                }`}
                whileHover={{ scale: 1.05, opacity: 0.85 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Side Details */}
        <motion.div
          className="sm:w-[50%] lg:w-[30%]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="pb-5">
            <h1 className="font-extrabold text-2xl">{product?.name}</h1>
            <p className="my-2 text-sm text-muted-foreground">
              {product?.description}
            </p>
            <div className="flex items-center">
              {starGenerator(product?.rating, "0", 15)}
              <span className="text-md ml-1">({product?.reviews?.length})</span>
            </div>
          </div>

          {/* Price */}
          <div className="py-5 border-t border-b space-y-1">
            <h3 className="font-bold text-xl">
              Rs.{product?.price}{" "}
              <span className="text-sm text-muted-foreground">
                or Rs.{calculateEmi(product?.price)}/month
              </span>
            </h3>
            <p className="text-sm">6 months special financing available</p>
          </div>

          {/* Color Selector */}
          <div className="py-5 border-t border-b">
            <h3 className="font-bold text-xl mb-2">Choose Color</h3>
            <div className="flex items-center gap-3">
              {product?.colors?.map((color, index) => (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setProductColor(color)}
                  className={`p-[2px] rounded-full cursor-pointer transition-all duration-300 ${
                    productColor === color
                      ? "ring-2 ring-primary"
                      : "ring-1 ring-gray-300"
                  }`}
                >
                  <Circle
                    fill={color}
                    strokeOpacity={0.2}
                    strokeWidth={0.2}
                    size={40}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quantity & Stock */}
          <div className="py-5 space-y-4">
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-5 bg-gray-100 rounded-full px-3 py-2 w-fit shadow-inner">
                <Minus
                  className="cursor-pointer hover:text-primary"
                  onClick={() =>
                    setProductQuantity((qty) => (qty > 1 ? qty - 1 : 1))
                  }
                  stroke={Colors.customGray}
                />
                <span className="text-slate-950">{productQuantity}</span>
                <Plus
                  onClick={() =>
                    setProductQuantity((qty) =>
                      qty < product?.stock ? qty + 1 : qty
                    )
                  }
                  className="cursor-pointer hover:text-primary"
                  stroke={Colors.customGray}
                />
              </div>
              {product?.stock - productQuantity > 0 && (
                <div className="grid text-sm font-semibold text-gray-600">
                  Only{" "}
                  <span className="text-customYellow">
                    {product?.stock - productQuantity} items
                  </span>{" "}
                  left! <span>Don't Miss it</span>
                </div>
              )}
            </div>

            {/* Pincode Checker */}
            <div className="grid gap-3">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter Your PinCode Here"
                  onChange={(e) => setPincode(e.target.value)}
                />
                <Button onClick={checkAvailability}>Check</Button>
              </div>
              <p className="text-sm px-2">{availabilityMessage}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  onClick={() => setPurchaseProduct(true)}
                  className="flex items-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Buy Now
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  variant="outline"
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add To Cart
                </Button>
              </motion.div>
            </div>

            {purchaseProduct && (
              <div className="my-2 space-y-2">
                <Input
                  placeholder="Enter Your Address Here..."
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Button onClick={handleBuyNow}>Confirm Order</Button>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Review Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <ReviewComponent productId={product?._id} />
      </motion.div>
    </div>
  );
};

export default Product;
