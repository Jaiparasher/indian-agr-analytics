import React, { useState } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider, Switch } from '@mantine/core';
import { data } from './data/data';
import Table1 from './components/Table1';
import Table2 from './components/Table2';
import { theme } from './theme';
import "./App.css"

interface DataItem {
  Year: string;
  "Crop Production (UOM:t(Tonnes))"?: string;
  "Crop Name": string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"?: string;
  "Area Under Cultivation (UOM:Ha(Hectares))"?: string;
}

interface YearData {
  year: string;
  maxCrop: string;
  minCrop: string;
}

interface CropData {
  crop: string;
  avgYield: string;
  avgArea: string;
}

function App() {
  // State to manage which table is shown
  const [showTable1, setShowTable1] = useState<boolean>(false);
  // Aggregate data for Table 1
  const yearData: YearData[] = aggregateYearData(data);
  // Aggregate data for Table 2
  const cropData: CropData[] = aggregateCropData(data);

  return (
    <MantineProvider theme={theme}>
      <div className="Container">
        <Switch 
          checked={showTable1}
          onChange={() => setShowTable1((prev) => !prev)}
          label={showTable1 ? "Show Table 1" : "Show Table 2"}
        />
        {showTable1 ? <Table2 data={cropData} /> : <Table1 data={yearData} />}
      </div>
    </MantineProvider>
  );
};

// Function to aggregate data for Table 1
const aggregateYearData = (data: DataItem[]): YearData[] => {
  const yearData: Record<string, { crop: string; production: number; }[]> = {};

  data.forEach(item => {
    const year = item.Year.split(", ")[1];
    const production = item["Crop Production (UOM:t(Tonnes))"];

    if (production) {
      if (!yearData[year]) {
        yearData[year] = [];
      }
      yearData[year].push({ crop: item["Crop Name"], production: parseFloat(production) });
    }
  });

  return Object.entries(yearData).map(([year, crops]) => {
    const maxCrop = crops.reduce((prev, curr) => (curr.production > prev.production ? curr : prev));
    const minCrop = crops.reduce((prev, curr) => (curr.production < prev.production ? curr : prev));
    return {
      year,
      maxCrop: maxCrop.crop,
      minCrop: minCrop.crop
    };
  });
};

// Function to aggregate data for Table 2
const aggregateCropData = (data: DataItem[]): CropData[] => {
  const cropData: Record<string, { yieldSum: number; areaSum: number; count: number; }> = {};

  data.forEach(item => {
    const crop = item["Crop Name"];
    const yieldCrop = item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];
    const area = item["Area Under Cultivation (UOM:Ha(Hectares))"];

    if (yieldCrop && area) {
      if (!cropData[crop]) {
        cropData[crop] = { yieldSum: 0, areaSum: 0, count: 0 };
      }
      cropData[crop].yieldSum += parseFloat(yieldCrop);
      cropData[crop].areaSum += parseFloat(area);
      cropData[crop].count += 1;
    }
  });

  return Object.entries(cropData).map(([crop, { yieldSum, areaSum, count }]) => ({
    crop,
    avgYield: (yieldSum / count).toFixed(3),
    avgArea: (areaSum / count).toFixed(3)
  }));
};

export default App;
