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
    <>
      <AppNavBar />
      <section className="mt-10 flex h-full flex-grow flex-col justify-center gap-10 px-15">
        {children}
      </section>
      {recipeModal}
      <AppFooter />
    </>
  );
}
