// import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Smart Serve"
        description="Dine In Restaurant Ordering System"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* TODO -> use bar chart and show the frequency of orders received */}
        {/* <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
