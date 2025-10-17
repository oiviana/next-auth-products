import MenuItem from "@/components/common/MenuItem";
import LogoutButton from "@/components/common/LogoutButton";

export default function SellerMenu() {
  return (
    <section className="absolute bg-amber-200 h-screen w-64">
      <ul className="p-4 space-y-4">
        <MenuItem 
          title="Início" 
          navigateTo="/seller" 
          icon="🏠"
        />
        <MenuItem 
          title="Produtos" 
          navigateTo="/seller/products" 
          icon="📦"
        />
        <MenuItem 
          title="Minha Conta" 
          navigateTo="/seller/account" 
          icon="👤"
        />
        <li className="p-2">
          <LogoutButton/>
        </li>
      </ul>
    </section>
  );
}