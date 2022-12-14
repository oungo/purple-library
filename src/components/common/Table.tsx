import { colors } from '@/styles/color';
import { ColumnsType } from '@/types/common';
import styled from 'styled-components';

const TableContainer = styled.table`
  table-layout: fixed;
  width: 100%;
  position: relative;
`;
const TheadTr = styled.tr`
  border-bottom: 1px solid ${colors.gray};
  background-color: ${colors.lightGray};
  th {
    padding: 10px 0;
  }
`;
const TbodyTr = styled.tr`
  :hover {
    background-color: ${colors.lightGray};
  }
`;
const Td = styled.td`
  padding: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
const EmptyTd = styled.td`
  position: absolute;
  width: 100%;
  text-align: center;
  padding: 1rem;
  color: ${colors.darkGray};
`;

interface TableProps<RecordType> {
  columns: ColumnsType<RecordType>;
  dataSource: RecordType[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <RecordType extends Record<string, any>>({
  columns,
  dataSource,
}: TableProps<RecordType>) => {
  return (
    <TableContainer align="right">
      <colgroup>
        {columns.map((col) => (
          <col key={`${col.title}${col.dataIndex}`} width={col.width}></col>
        ))}
      </colgroup>
      <thead>
        <TheadTr>
          {columns?.map((col) => (
            <th key={`${col.title}${col.dataIndex}`}>{col.title}</th>
          ))}
        </TheadTr>
      </thead>
      <tbody>
        {dataSource.length < 1 && (
          <tr>
            <EmptyTd>조회된 데이터가 없습니다</EmptyTd>
          </tr>
        )}
        {dataSource?.map((data) => (
          <TbodyTr key={data.id}>
            {columns.map((col) => (
              <Td key={`${col.title}${col.dataIndex}`} align={col.align || 'left'}>
                {col.render
                  ? col.render(col.dataIndex && data[col.dataIndex], data)
                  : col.dataIndex && data[col.dataIndex]}
              </Td>
            ))}
          </TbodyTr>
        ))}
      </tbody>
    </TableContainer>
  );
};

export default Table;
