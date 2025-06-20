import { View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/app/models/navigation";
import { useEffect, useState, useTransition } from "react";
import LoadingComponent from "@/app/components/loading";
import { ProductResponse } from "@/app/models/product";
import getProductId from "@/app/actions/product/get-product-id";
import ProductForm from "@/app/components/product/product-form";
import { BottomTab } from "@/app/components/bottom-tab";

type Props = RouteProp<RootStackParamList, "ProductEdit">;

export default function ProductEditScreen() {
  const { params } = useRoute<Props>();
  const {
    product: { id },
  } = params;

  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchProduct = async () => {
      startTransition(async () => {
        try {
          const response = await getProductId({ id: String(id) });
          setProduct(response.data);
        } catch (error) {
          console.error("Erro ao buscar produto:", error);
        }
      });
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <View className="flex min-h-full flex-col gap-10 bg-white p-4">
          {product && <ProductForm product={product} id={String(id)} />}
        </View>
      )}

      <BottomTab />
    </>
  );
}
