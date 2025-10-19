import MenuItem from "@/components/common/MenuItem";
import LogoutButton from "@/components/common/LogoutButton";

export default function SellerMenu() {
  return (
    <section className="absolute bg-white h-screen w-64 shadow-md pl-5">
      <h1 className="text-left my-8 text-lg lg:text-xl font-semibold">Next Auth Products</h1>
      <ul className=" space-y-4">
        <MenuItem 
          title="Início" 
          navigateTo="/seller" 
        
        />
        <MenuItem 
          title="Produtos" 
          navigateTo="/seller/products" 
         
        />
        <MenuItem 
          title="Minha Conta" 
          navigateTo="/seller/account" 
        
        />
        <li>
          <LogoutButton/>
        </li>
      </ul>
    </section>
  );
}