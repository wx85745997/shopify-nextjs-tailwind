import { Product } from "@/types";

export default function ProductPageContent({
  product,
}: {
  product: Product["node"];
}) {
  return <div>{product.title}</div>;
}
