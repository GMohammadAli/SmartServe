import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useParams } from "react-router-dom";
import { IMenuItem, useGetMenuItems } from "../../hooks/useGetMenuItems";

const ItemCard = ({ item }: { item: IMenuItem }) => {
  return (
    <div className="p-3 border border-gray-200 rounded-xl dark:border-gray-800">
      <img
        src={""}
        alt={item.label}
        className="w-full h-auto object-cover rounded-lg"
      />
      <p className="mt-2 text-sm font-medium text-center">{item.label}</p>
      <p className="text-xs text-gray-500 text-center">{item.price} Rs.</p>
    </div>
  );
};

const ImageGrid = ({ menuItems }: { menuItems: IMenuItem[] }) => {
  const hasItems = Array.isArray(menuItems) && menuItems.length > 0;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {hasItems &&
        menuItems.map((item) => <ItemCard item={item} key={item._id} />)}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  const result = array.reduce((acc, item) => {
    const groupKey = item[key] as string;

    acc[groupKey] = acc[groupKey] || [];

    acc[groupKey].push(item);
    console.log({ acc });
    return acc;
  }, {} as Record<string, T[]>); // Initial value of accumulator is an empty object

  console.log({ result, array, key });
  return result;
};

type GroupedMenuItems = Record<string, IMenuItem[]>;

// --- Main Menu Page Component ---

const FullMenuPage = () => {
  const { tableId } = useParams<{ tableId: string }>();

  const { menuItems = [], isLoading, error } = useGetMenuItems();

  if (isLoading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        🍽️ Loading the menu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        ❌ Error fetching the menu.
      </div>
    );
  }

  const groupedItems: GroupedMenuItems = groupBy(
    menuItems as IMenuItem[],
    "cuisine"
  );

  const categoryKeys = Object.keys(groupedItems);

  if (categoryKeys.length === 0) {
    return <div className="text-center py-10">No items found on the menu.</div>;
  }

  return (
    <>
      <PageMeta
        title="Smart Serve"
        description={`Restaurant Menu for ${tableId}`}
      />
      <PageBreadcrumb pageTitle="Menu" />
      <div className="space-y-5 sm:space-y-6">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {categoryKeys.map((categoryName) => (
            <section key={categoryName} className="mb-16">
              <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-blue-500 pb-3 mb-8 capitalize">
                {categoryName}
              </h2>

              <ImageGrid menuItems={groupedItems[categoryName]} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default FullMenuPage;
