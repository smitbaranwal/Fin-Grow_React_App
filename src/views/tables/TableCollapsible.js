// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { CardHeader, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import { Link, Tooltip } from '@mui/material'
// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
// import { CardHeader } from '@mui/material'
import { styled } from '@mui/material/styles'

import getTransactions from 'src/@core/utils/queries/getTransactions'
import BackdropLoader from 'src/@core/layouts/components/shared-components/BackdropLoader'
import { Account, ArrowDownBoldCircleOutline, ArrowUpBoldCircleOutline, ArrowDownThin, ArrowUpThin, Launch } from 'mdi-material-ui'

import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import moment from 'moment'
import XLSX from 'sheetjs-style'
import Cashflow from 'src/pages/reports/cashflow'
import CashflowSpreadsheet from '../reports/Cashflow'
import getFiatCurrency from 'src/@core/utils/queries/getFiatValue'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: '#b892fe'
    // innerWidth: '50px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const Row = props => {
  // ** Props
  const { row, open } = props

  // ** State
  const [collapse, setCollapse] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const userAccountIcon = <Account />

  useEffect(() => {
    setCollapse(false)
  }, [open])


  function isFloat(x) { return !!(x % 1); }

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setCollapse(!collapse)}>
            {collapse ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>
          {/* <div style={{ color: row.totalTokenAmt > 0 ? 'green' : 'red' }}>{row.totalTokenAmt}</div> */}
          <div style={{ color: row.totalTokenAmt > 0 ? 'green' : 'red' }}>{row.totalTokenAmt > 0 ? row.totalTokenAmt : row.totalTokenAmt*-1}</div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={collapse} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              {!open ? (
                <>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align='left'>Date (UTC)</StyledTableCell>
                        <StyledTableCell align='center'>Hash</StyledTableCell>
                        <StyledTableCell align='center'>From</StyledTableCell>
                        <StyledTableCell align='center'>To</StyledTableCell>
                        <StyledTableCell align='center'>Token Amount/ <br/> Fiat </StyledTableCell>
                        {/* <StyledTableCell align='center'>Fiat</StyledTableCell> */}
                        {/* <StyledTableCell align='right'>Gain/Loss</StyledTableCell> */}
                        <StyledTableCell align='right'>Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {row.transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                      // {.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell scope='row'>
                            <div style={{ display: 'inline-block', width: '100px', content: '', textAlign: "left" }}>
                              <span style={{ verticalAlign: 'super' }}> {item.Category} </span>
                            </div>
                            <br />
                            {moment(item.Executedat, 'DD-MM-YYYY hh:mm:ss T').format('ll')}
                          </StyledTableCell>
                          <StyledTableCell scope='row'>
                    <div style={{ display: 'inline-block', width: '100px', content: '', textAlign: "center" }}>
                   
                                    <Tooltip title={item.TransactionHash}>
                                     <Link href={`https://etherscan.io/tx/${item.TransactionHash}`} target='_blank' >
                                    {item.TransactionHash.length > 5
                                        ? `${item.TransactionHash.substring(
                                            0,
                                            5
                                          )}...`
                                        : (
                                          <span style={{textAlign: "center"}}>{
                                           item.TransactionHash} </span>)} <Launch/>
                                      </Link>
                                      </Tooltip>
                    </div>
                  </StyledTableCell>
                          <StyledTableCell size='small' align='right'>
                            <div style={{ width: '180px' }}>
                              {/* {item.FromAddress.length > 3 ? userAccountIcon : ''} */}
                              <span style={{ verticalAlign: 'super' }}>
                                {item.FromAddress?.length > 3
                                  ? item.FromAddress.substring(0, 8) + '...' + item.FromAddress.substring(36, 42)
                                  : '--'}
                              </span>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align='right'>
                            <div style={{ width: '180px' }}>
                              {item.FromAddress?.length > 3 ? userAccountIcon : ''}
                              <span style={{ verticalAlign: 'super' }}>
                                {item.ToAddress?.length > 3
                                  ? item?.ToAddress.substring(0, 8) + '...' + item.ToAddress.substring(36, 42)
                                  : '--'}
                              </span>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                              {/* <span title={'Per token value is calculated with latest ' + item.FiatPrice + ' USD'}>({item.FiatValue !== '--' ? '$ ' + item.FiatValue : '--'})</span> <br/> */}
                              {/* ({item.TokenAmount !== '--' ? item.TokenAmount + ' ' + item.TokenSymbol : '--'}) */}
                              <div style={{ width: '180px' }}>
                      <span style={{ verticalAlign: 'super', textAlign: "center" }}>
                      {item.TokenAmount === "--" ?(
                        ''
                      ) : isFloat(item.TokenAmount) == true ? (
                        item.USDAmount != "--" ? 
                       (
                        <Typography>

                        {parseFloat(item.TokenAmount).toFixed(3)} BANK (${item.USDAmount})
                        </Typography>) : (
                          <Typography>
                           {parseFloat(item.TokenAmount).toFixed(3)} BANK (${item.USDAmount})
                          </Typography>
                        )
                      ):
                      <Typography>{item.TokenAmount} BANK (${item.USDAmount})</Typography> 
                    
                      }
                                           
                      
                      </span>
                    </div>
                          </StyledTableCell>
                          {/* <StyledTableCell align='right'>
                            <div style={{ width: '100px' }}>${item.FiatValue}</div>
                          </StyledTableCell> */}
                          {/* <StyledTableCell align='right'>
                            <div>{item.USDAmount !== '--' ? '$' + item.USDAmount : '--'}</div>
                          </StyledTableCell> */}
                          <StyledTableCell align='right'>
                            
                            <div style={{ color: item.TransactionStatus === 'Success' ? 'green' : 'red' }}>
                              {item.TransactionStatus}
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
  <TablePagination
  rowsPerPageOptions={[10, 25, 100]}
  component='div'
  count={row.transactions.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
</>
              ) : (
                ''
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const operationTransactionKey = 'Cash Flow From Operation'
const investmentTransactionKey = 'Cash Flow From Investment'
const financeTransactionKey = 'Cash Flow from Financial Activities'

const TableCollapsible = props => {
  const { setSpreadsheetData, setTransactionsData } = props
  const daoObject = {}

  const [transactionTypeList, setTransactionTypeList] = useState([])
  // const [spreadsheetData, setSpreadsheetData] = useState([])
  const [open, setOpen] = useState(false)



  const getFiatValues = function(data) {
    // data.
    getFiatCurrency(updateTrx, data)
    // updateTrx()
  }

  const updateTrx = function (data) {
    data.forEach(trx => {
      let insertInTransactionType = ''
      if (operationCategory.findIndex(c => c == trx.Category) > -1) {
        // is a operation type of transation
        insertInTransactionType = operationTransactionKey
      } else if (investmentCategory.findIndex(c => c == trx.Category) > -1) {
        // is a investment type of transation
        insertInTransactionType = investmentTransactionKey
      } else if (financialCategory.findIndex(c => c == trx.Category) > -1) {
        // is a financial type of transation
        insertInTransactionType = financeTransactionKey
      }
      if (insertInTransactionType !== '') {
        if (!daoObject[insertInTransactionType] || !daoObject[insertInTransactionType].categories) {
          daoObject[insertInTransactionType] = { trxTypeTotalTokenAmt: 0, categories: [] }
        }
        let availableCatIndex = daoObject[insertInTransactionType].categories.findIndex(c => c.name == trx.Category)
        if (availableCatIndex < 0) {
          // adding category for the first time
          let categoryData = {
            name: trx.Category,
            transactions: [trx]
          }

          if (trx.Type == 'Outgoing') {
            daoObject[insertInTransactionType].trxTypeTotalTokenAmt = 0 - trx.TokenAmount
            categoryData.totalTokenAmt = 0 - trx.TokenAmount
          } else if (trx.Type == 'Incoming') {
            daoObject[insertInTransactionType].trxTypeTotalTokenAmt = trx.TokenAmount
            categoryData.totalTokenAmt = trx.TokenAmount
          }
          daoObject[insertInTransactionType].categories.push(categoryData)
        } else {
          if (trx.Type == 'Outgoing') {
            daoObject[insertInTransactionType].trxTypeTotalTokenAmt -= trx.TokenAmount
            daoObject[insertInTransactionType].categories[availableCatIndex].totalTokenAmt -= trx.TokenAmount
          } else if (trx.Type == 'Incoming') {
            daoObject[insertInTransactionType].trxTypeTotalTokenAmt += trx.TokenAmount
            daoObject[insertInTransactionType].categories[availableCatIndex].totalTokenAmt += trx.TokenAmount
          }
          daoObject[insertInTransactionType].categories[availableCatIndex].transactions.push(trx)
        }
      }
    })

    console.log('data from table collapsible', data)
    console.log('new list from table collapsible', daoObject)
    let daoList = []
    let excelData = []
    Object.keys(daoObject).forEach(key => {
      daoList.push({
        name: key,
        trxTypeTotalTokenAmt: daoObject[key].trxTypeTotalTokenAmt,
        categories: daoObject[key].categories
      })
      console.log('categories data', daoObject[key].categories)
      excelData.push(...daoObject[key].categories)
    })
    console.log('new daoList from table collapsible', daoList)
    // console.log('new spreadsheetData from table collapsible', spreadsheetData)
    setTransactionTypeList(daoList)
    setTransactionsData(daoList)
    setSpreadsheetData(excelData)
  }
  
  const financialCategory = ['Token Release', 'Compensation']

  const operationCategory = [
    'Salary',
    'Bounty',
    // 'Other',
    // 'Others',
    'Expenses',
    'Coordinape',
    'Services Rendered',
    'Product Purchase',
    'Assets Purchase',
    'Airdrop',
    'Revenue',
    'Retroactive Compensation',
    'Revenue / Services Exchanged',
    'Reimbursement',
    'Service Purchase',
    'Commission',
    // 'Miscellaneous',
    'Donation',
    'Product Sale',
    'Service Sale',
    'Asset Purchase'
  ]

  const investmentCategory = [
    // 'Product Purchase',
    // 'Donation',
    'Token Swaps',
    'Grants',
    'Grant',
    'Investment Income',
    'Capital Return',
    'Asset Sale'
  ]

  useEffect(() => {
    setOpen(true)
    getTransactions(getFiatValues, setOpen)
  }, [])

  const convertToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactionTypeList)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'test_gen1' + '.xlsx')
  }

  return (
    <Fragment>
      {/* <button onClick={convertToExcel}>Download Excel</button> */}

      {/* <CashflowSpreadsheet data={spreadsheetData} />  */}

      <BackdropLoader open={open} />
     
       {transactionTypeList.map(doa => (
        <>
          <Grid key={doa.name} item xs={12} style={{ marginTop: '10px' }}>
            <Card>
              <CardHeader title={doa.name} titleTypographyProps={{ variant: 'h6' }} />
              <TableContainer component={Paper}>
                <Table aria-label='collapsible table'>
                  <TableHead>
                    <TableRow>
                      <TableCell width={'50px'} />
                      <TableCell align='left'>Categories</TableCell>
                      <TableCell align='right'>Total Flow</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
            
                    {doa.categories.map(row => (
                      <Row key={row.name} row={row} open={open} />
                    ))}
                    <TableRow>
                      <TableCell rowSpan={1} />
                      <TableCell colSpan={1}>
                        <b>Subtotal</b>
                      </TableCell>
                      <TableCell align='right'>
                        <b>
                          <div style={{ color: doa.trxTypeTotalTokenAmt > 0 ? 'green' : 'red' }}>
                          ${doa.trxTypeTotalTokenAmt > 0 ? doa.trxTypeTotalTokenAmt : doa.trxTypeTotalTokenAmt*-1}
                          </div>
                        </b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            
            </Card>
          </Grid>
        </>
      ))}
    </Fragment>
  )
}

export default TableCollapsible