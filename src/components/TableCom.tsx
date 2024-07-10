import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


interface TableComProps {
    rows: any[];
    columns: GridColDef[];
  }

  const TableCom: React.FC<TableComProps> = ({ rows, columns }) => {
  return (
    <Box sx={{backgroundColor: '#e8e6eb', height: 647, width:{md:"100%",lg:"50%"}, marginX: "auto",columnGap: "10px" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                />
            </Box>
  )
}

export default TableCom;
