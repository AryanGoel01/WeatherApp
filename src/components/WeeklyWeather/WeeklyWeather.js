import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
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

const WeeklyWeather = ({ input }) => {
  const [weeklyData, setWeeklyData] = useState();

  const fetchweeklyData = async () => {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=048c43a2f7e00f37c3b4044df2ec3128`
      );
      const res = await data.json();
      setWeeklyData(res);
    } catch (err) {
      alert("City Not Found");
    }
  };

  useEffect(() => {
    fetchweeklyData();
  }, []);

  return (
    <div>
      {weeklyData && (
        <div>
          <div id="top">
            <h1> City : {weeklyData.city.name}</h1>
            <h1> Country : {weeklyData.city.country}</h1>
          </div>

          <TableContainer component={Paper} sx={{maxHeight:460}}>
            <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell> Date & Time </StyledTableCell>
                  <StyledTableCell align="right"> Temperature </StyledTableCell>
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
                {weeklyData.list.map((row, i) => (i===0 || i % 6 ===0) && (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {row.dt_txt}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                    {(row.main.temp - 273.15).toFixed(2)} °C
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.main.humidity}%
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.main.pressure} mb
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.wind.speed} mph</StyledTableCell>
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
    </div>
  );
};

export default WeeklyWeather;
 