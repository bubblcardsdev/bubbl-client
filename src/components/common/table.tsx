import { TableProps } from "@/src/lib/interface";
import { NoDataIcon } from "./icons";

export default function Table<T>({
  data,
  columns,
  rowKey,
  rowClassName,
  stickyHeader = true,
  tableWrapperClassName = "",
  containerClassName = "rounded-2xl",
  tableClassName = "",
  theadClassName = "",
  tbodyClassName = "",
  emptyIcon,
  emptyMessage = "",
  onRowClick,
}: TableProps<T>) {
  console.log(data, "data")
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center p-6 gap-4 w-full h-[400px] bg-[#282828] text-white text-opacity-40 rounded-2xl">
        {emptyIcon || <NoDataIcon />}
        <p className="text-center">
          {emptyMessage ||
            "Share your contact info to ensure smooth, effortless connectivity."}
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto rounded-2xl ${containerClassName}`}>
      <div
        className={`h-[400px] overflow-y-auto bg-[#282828] ${tableWrapperClassName}`}
      >
        <table
          className={`min-w-full bg-[#282828] divide-y divide-[#ffffff] divide-opacity-10 rounded-2xl ${tableClassName}`}
        >
          <thead
            className={`${stickyHeader ? "sticky top-0 z-10" : ""
              } bg-[#282828] border-b border-[#ffffff] border-opacity-10 rounded-2xl ${theadClassName}`}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-left text-base font-medium text-white text-opacity-40 ${col.headerClassName}`}
                  scope="col"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody
            className={`divide-y divide-[#ffffff] divide-opacity-10 bg-[#282828] ${tbodyClassName}`}
          >
            {data.map((item, index) => (
              <tr
                key={rowKey ? rowKey(item, index) : index}
                className={rowClassName || ""}
                onClick={() => onRowClick?.(item, index)}
              >
                {columns.map((col) => (
                  <td
                    key={`${col.key}-${index}`}
                    className={`px-6 py-4 ${col.cellClassName}`}
                    scope="row"
                  >
                    {col.render(item, index)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
