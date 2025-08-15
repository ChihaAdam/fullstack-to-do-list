import { getItem, setItem } from "@/lib/localstorage";
import { useEffect, useState } from "react";

export function useLocalStorage<T = any>(key: string, initialValue: T) {
  const [persistantItem, setPersistantItem] = useState(
    getItem(key) ?? initialValue
  );
  useEffect(() => {
    setItem(key, persistantItem);
  }, [persistantItem]);
  return [persistantItem,setPersistantItem]
}
