import style from "./search.module.css";
import RightSectionSearch from "../_components/homeSection/homeRightSection/RightSectionSearch";
import BackButton from "../_components/homeSection/homeMainSection/tab/BackButton";
import SearchResult from "./_component/SearchResult";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};
export default function Search({ searchParams }: Props) {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton page="/explore" />
          </div>
          <div className={style.formZone}>
            <RightSectionSearch q={searchParams.q} />
          </div>
        </div>
      </div>
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
}
