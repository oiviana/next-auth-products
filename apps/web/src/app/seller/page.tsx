import Section from "@/components/common/Section";
import SellerDashBoard from "@/components/common/SellerDashboard";
import SellerMenu from "@/components/seller/menu/SellerMenu";

export default function SellerPage() {
    return (
        <>
            <SellerMenu />
            <Section>
                <SellerDashBoard/>
            </Section>
        </>

    )
}