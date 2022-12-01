import { ColumnsType } from '@/types/common';

interface TableProps<RecordType = unknown> {
  columns: ColumnsType;
  dataSource: RecordType[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = <RecordType extends Record<string, any>>({
  columns,
  dataSource,
}: TableProps<RecordType>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns?.map((col) => (
            <th key={col.dataIndex}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource?.map((data) => (
          <tr key={data.id}>
            {columns.map((col) => (
              <td key={col.dataIndex}>
                {col.render ? col.render(data[col.dataIndex]) : data[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
