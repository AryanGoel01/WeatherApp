import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SixteenDays = ({ input }) => {
  const [sixteenDaysData, setsixteenDaysData] = useState();

  const fetchSixteenDaysData = async () => {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${input}&units=metric&cnt=16&appid=048c43a2f7e00f37c3b4044df2ec3128`
      );
      const res = await data.json();
      setsixteenDaysData(res);
    } catch (err) {
      alert("Data Not Found");
    }
  };

  useEffect(() => {
    fetchSixteenDaysData();
  }, []);

  return (
    <>
      {sixteenDaysData && sixteenDaysData != undefined && (
        <div>
          <div>
            {sixteenDaysData && (
              <div>
                <div id="top">
                  <h1> City : {sixteenDaysData.city.name}</h1>
                  <h1> Country : {sixteenDaysData.city.country}</h1>
                </div>
              </div>
            )}
          </div>

          <TableContainer component={Paper} sx={{maxHeight:460}}>
            <Table sx={{ minWidth: 700}} stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell> Date </StyledTableCell>
                  <StyledTableCell align="right"> Clouds </StyledTableCell>
                  <StyledTableCell align="right">
                    Humidity&nbsp;
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Pressure&nbsp;
                  </StyledTableCell>
                  <StyledTableCell align="right">Wind Speed&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">
                    Description&nbsp;
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sixteenDaysData.list.map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {JSON.stringify(new Date(row?.dt * 1000)).slice(1, 11)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.clouds}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.humidity}%
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.pressure} mb
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.speed} mph</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.weather[0].description}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default SixteenDays;
