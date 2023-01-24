import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Styles
import classes from "./ResultsTable.module.scss";

interface ResultsTableProps {
  results: number[];
  coefficientA: number;
  coefficientB: number;
  coefficientC: number;
}

const ResultsTable: FC<ResultsTableProps> = ({
  results,
  coefficientA,
  coefficientB,
  coefficientC,
}) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Box}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>a</TableCell>
            <TableCell className={classes.tableCell}>b</TableCell>
            <TableCell className={classes.tableCell}>c</TableCell>
            <TableCell className={classes.tableCell}>{t("results")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableCell}>{coefficientA}</TableCell>
            <TableCell className={classes.tableCell}>{coefficientB}</TableCell>
            <TableCell className={classes.tableCell}>{coefficientC}</TableCell>
            <TableCell className={classes.tableCell}>
              {results.length == 0 ? (
                <div>{t("noRoots")}</div>
              ) : (
                results.map((root, index) => (
                  <div key={root}>
                    x<sub>{index + 1}</sub> = {root}
                  </div>
                ))
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;
