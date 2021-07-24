import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
    
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    tableHead:{
        marginTop:20,
        display:'flex',
        justifyContent:'center',
        textAlign:'center',
        
    },
  });
  
const RequiredCredits=(props)=>{
    const RequiredCredits=props.props;
    console.log(RequiredCredits);
    const classes = useStyles();
    let totcur=0;let totreq=0;
    for (let i = 0; i < RequiredCredits.current_credit.length; i++) {
        totcur += RequiredCredits.current_credit[i] ;
      }
      for (let i = 0; i < RequiredCredits.requiredCredit.length; i++) {
        totreq += RequiredCredits.requiredCredit[i] ;
      }
      console.log(totcur,totreq)
  return (
      <div className={classes.tableHead}>
    <TableContainer  component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell >Current Credits</StyledTableCell>
            <StyledTableCell >Required Credits&nbsp;</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        
          {RequiredCredits&& RequiredCredits.cat && RequiredCredits.cat.map((row,index) => (
            <StyledTableRow key={row['abbreviation']}>
              <StyledTableCell component="th" scope="row">
                {row['abbreviation']}
              </StyledTableCell>
              <StyledTableCell >{RequiredCredits.current_credit[index]}</StyledTableCell>
              <StyledTableCell >{RequiredCredits.requiredCredit[index]}</StyledTableCell>
              
            </StyledTableRow>
          ))}
          <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {'Total'}
              </StyledTableCell>
              <StyledTableCell >{totcur}</StyledTableCell>
              <StyledTableCell >{totreq}</StyledTableCell>
              
            </StyledTableRow>
            
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
};

export default RequiredCredits;