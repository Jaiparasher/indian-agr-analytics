import React from 'react';
import { Table } from '@mantine/core';

interface Table1Props {
  data: {
    year: string;
    maxCrop: string;
    minCrop: string;
  }[];
}

const Table1: React.FC<Table1Props> = ({ data }) => {
  // Generate table rows from data
  const rows = data.map((row, index) => (
    <Table.Tr  key={index}>
      <Table.Td>{row.year}</Table.Td>
      <Table.Td>{row.maxCrop}</Table.Td>
      <Table.Td>{row.minCrop}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <h2>Table 1</h2>
      <Table  miw={700}>
        <Table.Thead>
          <Table.Tr >
            <Table.Td>Year</Table.Td>
            <Table.Td>Crop with Maximum Production in that Year</Table.Td>
            <Table.Td>Crop with Minimum Production in that Year</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Table1;
