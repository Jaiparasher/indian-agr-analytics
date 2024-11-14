import React from 'react';
import { Table } from '@mantine/core';

interface Table2Props {
  data: {
    crop: string;
    avgYield: string;
    avgArea: string;
  }[];
}

const Table2: React.FC<Table2Props> = ({ data }) => {
  // Generate table rows from data
  const rows = data.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{row.crop}</Table.Td>
      <Table.Td>{row.avgYield}</Table.Td>
      <Table.Td>{row.avgArea}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <h2>Table 2</h2>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>Crop</Table.Td>
            <Table.Td>Average Yield of the Crop (1950-2020)</Table.Td>
            <Table.Td>Average Cultivation Area of the Crop (1950-2020)</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Table2;
