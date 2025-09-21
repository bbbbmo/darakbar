import BarFilter from "./_components/BarFilter";
import BarSearchHeader from "./_components/BarSearchHeader";
import BarList from "./_components/BarList";
import BarMap from "./_components/BarMap";

export default function BarSearch() {
  return (
    <>
      <BarSearchHeader />
      <BarFilter />
      <BarMap />
      <BarList />
    </>
  );
}
