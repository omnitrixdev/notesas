import React from "react";

type ListRendererProps<T> = {
  lists: T[];
  renderItem: (item: T) => React.ReactNode;
  fallback?: React.ReactNode;
};

export function ListRenderer<T>({
  lists,
  renderItem,
  fallback = null,
}: ListRendererProps<T>) {
  if (!lists || lists.length === 0) {
    return <>{fallback}</>;
  }

  return (
    <>
      {lists.map((item, index) => (
        // Call the renderItem function to render each item
        <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
      ))}
    </>
  );
}
