import Section from "@/components/common/Section"
import SellerMenu from "@/components/seller/menu/SellerMenu"
import Link from "next/link"

export default function SellerProductsPage() {
  return (
    <>
    <SellerMenu/>
    <Section>
      <h2>Seus productos</h2>

      <Link
        href="/seller/products/new"
        style={{
          display: "inline-block",
          marginTop: 10,
          padding: "8px 12px",
          backgroundColor: "#0070f3",
          color: "#fff",
          borderRadius: 4,
          textDecoration: "none",
        }}
      >
        Adicionar Produtos
      </Link>
    </Section>
    </>
  )
}
