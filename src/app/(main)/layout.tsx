import AppFooter from "@/components/App/AppFooter";
import AppNavBar from "@/components/App/AppNavBar/AppNavBar";

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
