import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";

export interface IMenuItem {
  _id: string;
  label: string;
  cuisine: string;
  ingredients: string[];
  price: number;
  availabilityInStock: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type GET_MENU_ITEMS_API_RESPONSE_TYPE = {
  data: IMenuItem[];
  success: boolean;
};

export const useGetMenuItems = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const resp: { data: GET_MENU_ITEMS_API_RESPONSE_TYPE } =
        await ApiService.get("/table/menu");
      console.log({ resp });
      if (resp.data?.success) {
        setMenuItems([...(resp.data?.data || [])]);
      }
    } catch (error) {
      console.error("Error while fetching menu items", error);
      setError("Get Menu Items fetch api failed!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return { menuItems, isLoading, error };
};
