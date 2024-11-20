import db from "@/db/dbConnect";
import { PageHeader } from "../../../_component/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductPage({
    params:{id},
}:{
    params:{id:string}
}){
    const product = await db.product.findUnique({where:{
        id
    }})
    return(
        <>
        <PageHeader>Edit Product</PageHeader>
        <ProductForm product = {product}/>
        </>
    )
}