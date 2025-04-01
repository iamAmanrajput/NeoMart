import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";
import useErrorLogout from "@/hooks/use-error-logout";
import Loader from "@/components/custom/Loader";
import { Colors } from "@/constants/colors";

const AllProducts = () => {
  const { products } = useSelector((state) => state.product);
  const { handleErrorLogout } = useErrorLogout();

  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getFilterProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/product/get-products?category=${category}&search=${searchTerm}`
      );
      const data = response.data;
      dispatch(setProducts(data.data));
    } catch (error) {
      handleErrorLogout(error, "Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const blacklistProduct = async (id) => {
    setLoadingProductId(id);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/product/blacklist-product/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getFilterProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleErrorLogout(error, "Error occurred while blacklisting product");
    } finally {
      setLoadingProductId(null);
    }
  };

  const whitelistProduct = async (id) => {
    setLoadingProductId(id);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/product/remove-from-blacklist/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getFilterProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleErrorLogout(error, "Error occurred while whitelisting product");
    } finally {
      setLoadingProductId(null);
    }
  };

  useEffect(() => {
    getFilterProducts();
  }, [searchTerm, category]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditModelOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const updatedProduct = {
      ...editingProduct,
      name: formdata.get("name"),
      description: formdata.get("description"),
      price: parseFloat(formdata.get("price")),
      category: formdata.get("category"),
    };
    dispatch(
      setProducts(
        products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      )
    );

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/product/update-product/${
          editingProduct._id
        }`,
        {
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: updatedProduct.price,
          category: updatedProduct.category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { success, message } = res.data;
      if (success) {
        toast(message);
      } else {
        toast(message);
      }
    } catch (error) {
      return handleErrorLogout(error, "Error Occured While Updating Product");
    }

    setIsEditModelOpen(false);
    setEditingProduct(null);
  };

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Headset">Headset</SelectItem>
                <SelectItem value="Keyboard">Keyboard</SelectItem>
                <SelectItem value="Mouse">Mouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>
      {loading ? (
        <div className="flex justify-center my-10">
          <Loader width={7} height={30} color={Colors.customGray} />
        </div>
      ) : products?.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No Products Found, Try Adjusting your search or category
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 max-w-[1600px] mx-auto">
          {products?.map((product) => (
            <Card
              key={product._id}
              className="flex flex-col w-full overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-52 sm:h-64 relative">
                <img
                  src={product.image.url}
                  alt={product.name}
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
              <CardContent className="flex-grow p-5">
                <h2 className="text-xl font-semibold mb-3 line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-xl font-bold">
                  ₹ {product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleEdit(product)}
                  className="flex-1"
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                {loadingProductId === product._id ? (
                  <Button disabled className="flex-1">
                    <Loader className="mr-2" />
                  </Button>
                ) : product.blacklisted ? (
                  <Button
                    className="flex-1"
                    onClick={() => whitelistProduct(product._id)}
                  >
                    Whitelist
                  </Button>
                ) : (
                  <Button
                    className="flex-1"
                    onClick={() => blacklistProduct(product._id)}
                  >
                    Blacklist
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditModelOpen} onOpenChange={setIsEditModelOpen}>
        <DialogContent className="sm-max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 items-center">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={editingProduct?.name}
                />
              </div>

              <div className="grid gap-4 items-center">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  type="text"
                  defaultValue={editingProduct?.description}
                />
              </div>

              <div className="grid gap-4 items-center">
                <Label htmlFor="price">price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={editingProduct?.price}
                />
              </div>

              <div className="grid gap-4 items-center">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={editingProduct?.category}>
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
