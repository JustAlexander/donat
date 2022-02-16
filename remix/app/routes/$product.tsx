import { useLoaderData, json, LoaderFunction, MetaFunction } from "remix";
import { catalogueClient } from "../clients";
import {
  ProductDocument,
  ProductQuery,
} from "../crystallize/queries/product.generated";
import { normalizeDocumentNode } from "../crystallize/utils/normalizeDocumentNode";
import { Product } from "../components/product";
import { componentContent } from "../crystallize/utils/componentContent";

export let loader: LoaderFunction = async ({ params }) => {
  const path = "/shop/donuts/" + params.product;
  const data = await catalogueClient.request<ProductQuery>(
    normalizeDocumentNode(ProductDocument),
    { path }
  );

  return json({ ...data, path });
};

export let meta: MetaFunction = ({ data }) => {
  let { product } = data;
  let description = componentContent(product.summary.content, "RichTextContent")
    ?.plainText[0];
    let image = product.defaultVariant.firstImage.url

  return {
    title: `${product.name} | Dounut`,
    description: `${description}`,
    "og:description": `${description}`,
    "og:image": `${image}`,
  };
};

export default function Index() {
  let data = useLoaderData();
  return (
    <div>
      <div
        className="bg-background5 z-0 absolute left-0 right-0"
        style={{
          borderRadius: "50%/20%",
          height: "65%",
          bottom: "10%",
          top: "21%",
          zIndex: "-1",
        }}
      ></div>
      <Product product={data.product} />
    </div>
  );
}