import React, { useEffect, useState } from "react";
import { starGenerator } from "@/constants/Helper";
import { Circle, Minus, Plus } from "lucide-react";
import { Colors } from "@/constants/colors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReviewComponent from "@/components/custom/ReviewComponent";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { productName } = useParams();

  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [productColor, setProductColor] = useState("");

  const [productQuantity, setProductQuantity] = useState(5);
  const [pincode, setPincode] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [purchaseProduct, setPurchaseProduct] = useState(false);
  const [address, setAddress] = useState("");

  const productStock = 10;

  useEffect(() => {
    const fetchProductByName = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/get-product/${productName}`
        );
        const { data } = res.data;
        setProduct(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchProductByName();
  }, [productName]);

  const calculateEmi = (price) => Math.round(price / 6);

  return (
    <div>
      <div>
        <main className="w-[92.5vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start gap-10 mx-auto my-10">
          {/* left side */}
          <div className="grid sm:w-[50%] gap-3">
            <img
              src={product?.images?.[selectedImage]?.url}
              className="w-full lg:[30rem] rounded-xl object-center object-cover border dark:border-none "
            />
            <div className="grid grid-cols-4 gap-3">
              {product?.images?.map(({ url, id }, index) => (
                <img
                  key={id}
                  src={url}
                  onClick={() => setSelectedImage(index)}
                  className="rounded-xl filter hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border dark:border-none"
                />
              ))}
            </div>
          </div>

          {/* right side */}
          <div className="sm:w-[50%] lg:w-[30%]">
            <div className="pb-5">
              <h1 className="font-extrabold text-2xl">{product?.name}</h1>
              <p className="my-2 text-sm">{product?.description}</p>
              <div className="flex items-center">
                {starGenerator(product?.rating, "0", 15)}
                <span className="text-md ml-1">
                  ({product?.reviews?.length})
                </span>
              </div>
            </div>
            <div className="py-5 border-t border-b">
              <h3 className="font-bold text-xl">
                Rs.{product?.price} or Rs.{calculateEmi(product?.price)}/month
              </h3>
              <p className="text-sm">
                Suggested payments with 6 months special financing
              </p>
            </div>
            <div className="py-5 border-t border-b">
              <h3 className="font-bold text-xl">Choose Color</h3>
              <div className="flex items-center my-2">
                {product?.colors?.map((color, index) => (
                  <Circle
                    key={index}
                    className="cursor-pointer filter hover:brightness-50 "
                    onClick={() => setProductColor(color)}
                    fill={color}
                    strokeOpacity={0.2}
                    strokeWidth={0.2}
                    size={40}
                  />
                ))}
              </div>
            </div>

            <div className="py-5">
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-5 bg-gray-100 rounded-full px-3 py-2 w-fit">
                  <Minus
                    className="cursor-pointer"
                    onClick={() =>
                      setProductQuantity((qty) => (qty > 1 ? qty - 1 : 1))
                    }
                    stroke={Colors.customGray}
                  />
                  <span className="text-slate-950">{productQuantity}</span>
                  <Plus
                    onClick={() =>
                      setProductQuantity((qty) =>
                        qty < productStock ? qty + 1 : qty
                      )
                    }
                    className="cursor-pointer"
                    stroke={Colors.customGray}
                  />
                </div>
                {product.stock - productQuantity > 0 && (
                  <div className="grid text-sm font-semibold text-gray-600">
                    <span>
                      Only{" "}
                      <span className="text-customYellow">
                        {product.stock - productQuantity} items{" "}
                      </span>
                      left!
                    </span>
                    <span>Don't Miss it</span>
                  </div>
                )}
              </div>

              <div className="grid gap-3 my-5">
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter Your PinCode Here"
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <Button>Check Availability</Button>
                </div>
                <p className="text-sm px-2">{availabilityMessage}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setPurchaseProduct(true)}>
                  Buy Now
                </Button>
                <Button>Add To Cart</Button>
              </div>
              {purchaseProduct && (
                <div className="my-2 space-y-2">
                  <Input
                    placeholder="Enter Your Address Here..."
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Button>Confirm Order</Button>
                </div>
              )}
            </div>
          </div>
        </main>
        {/* review section */}
        <ReviewComponent></ReviewComponent>
      </div>
    </div>
  );
};

export default Product;
