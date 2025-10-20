import Section from "@/components/common/Section";
import SellerMenu from "@/components/seller/menu/SellerMenu";

export default function AccountPage() {

    return (
        <>
            <SellerMenu />
            <Section>
                <div>
                    <h1>
                        Loja de Lucas Viana
                    </h1>
                </div>
                <div>
                    dados
                </div>
                <div>
                    historico de vendas
                </div>
            </Section>
        </>
    )
}