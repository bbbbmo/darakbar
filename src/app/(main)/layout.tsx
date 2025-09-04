import AppFooter from "@/components/Layout/Footer";
import AppNavBar from "@/components/Layout/NavBar/NavBar";

export default function MainLayout({
  children,
  recipeModal,
}: {
  children: React.ReactNode;
  recipeModal: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppNavBar />
      <section className="mt-10 flex flex-1 flex-col gap-10 px-15">
        {children}
      </section>
      {recipeModal}
      <AppFooter />
    </div>
  );
}
