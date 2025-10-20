import Section from "@/components/common/Section";
import ProductGrid from "@/components/product/ProductGrid";
import UserMenu from "@/components/user/menu/UserMenu";

export default function UserProductsPage(){

    return(
        <>
        <UserMenu/>
        <Section>
            <ProductGrid/>
        </Section>
        </>
    )
}