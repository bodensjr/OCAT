import React, { useState, useEffect } from 'react';
import { AssessmentService } from '../shared/services/assessment.service';
import { useTable, useSortBy, useFilters } from 'react-table';

export function AssessmentList(){
    
    const [columnsArray, setColumnsArray] = useState([]);

    useEffect(function fetch() {
        (async function() {
            const Data = await AssessmentService.retrieveAll();
            const columnData = []
            Data.data.forEach(assessment => {
                
                let dateOfBirth = Date.parse(assessment.DateOfBirth);
                dateOfBirth = new Date (dateOfBirth);
                dateOfBirth = dateOfBirth.toLocaleDateString("en-US");
                
                let createdDate = Date.parse(assessment.DateCreated);
                createdDate = new Date (createdDate);
                createdDate = createdDate.toLocaleString("en-US");
                
                columnData.push(
                    {
                        column1: assessment.Name,
                        column2: dateOfBirth,
                        column3: assessment.instrument,
                        column4: assessment.riskLevel,
                        column5: assessment.score+'',
                        column6: createdDate,
                    })
            });
            setColumnsArray(columnData);
        })();
    },[]);
        
    const tableColumns = createTableColumns();
    const tableData = createTableDate();
    const table = createTable(tableColumns, tableData);
    const alternativeDisplay = AlternativeDisplay();

    let display = columnsArray.length>0 ? table: alternativeDisplay;
    
    return display;
    
    function createTableColumns() {
        const columns = React.useMemo(
            () => [
                {
                Header: 'Name',
                accessor: 'column1',
                sortType: 'basic',
                Filter: Filter
                },          
                {
                Header: 'Date of Birth',
                accessor: 'column2',
                sortType: 'basic',
                Filter: Filter
                }, 
                {
                Header: 'Instrument',
                accessor: 'column3', 
                sortType: 'basic',
                Filter: Filter
                },
                {
                Header: 'Risk Level',
                accessor: 'column4',
                sortType: 'basic',
                Filter: Filter
                },          
                {
                Header: 'Score',
                accessor: 'column5',
                sortType: 'basic',
                Filter: Filter
                },
                {
                Header: 'Created at',
                accessor: 'column6',
                sortType: 'basic', 
                Filter: Filter
                },
            ],
            []
            );

        return columns;
    }

    function createTableDate() {
        return React.useMemo(() => columnsArray,[columnsArray]);
    }
    
    function createTable(columns, data){
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow
        } = useTable({ columns, data },useFilters,useSortBy);
    
        let uniqueListkey = 0;
        const table =     
        <div className="container">
            <div className="row justify-content-md-center">
                <table 
                    {...getTableProps()} 
                    style={{
                            textAlign:'center',
                    }}    
                >
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr key={uniqueListkey++}{...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th
                                key={uniqueListkey++}
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                            >
                                {column.render('Header')}
                                <span 
                                style={{position:'relative', left:'15px'}} 
                                role="img" 
                                aria-label="up and down arrows"
                                >
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '🟦'}
                                </span>
                            </th>
                            ))}
                        </tr>
                        ))}
                        {headerGroups.map(headerGroup => (
                        <tr key={uniqueListkey++}{...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th key={uniqueListkey++}>
                                <div>{column.canFilter? column.render('Filter'): null}</div>
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody 
                        {...getTableBodyProps()}
                        style={{
                            textAlign:'center',
                        }} 
                    >
                        {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr key={uniqueListkey++}{...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                <td
                                    key={uniqueListkey++}
                                    {...cell.getCellProps()}
                                    style={{
                                        padding: '10px 15px',
                                        border: 'solid 1px gray',
                                        }}
                                >
                                    {cell.render('Cell')}
                                </td>
                                )
                            })}
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>;

        return table;
    }

    function Filter ({column}) {
        const {filterValue, setFilter} = column;
        return(
            <span> 
                <input 
                    placeholder='filter'
                    value={filterValue || ''} 
                    onChange={(event)=> setFilter(event.target.value)}
                    style={{textAlign:'center'}} 
                /> 
            </span>
        );
    };

    function AlternativeDisplay(){   
        return (
            <div className="container">
                <div className="row justify-content-md-center">;
                    <div>No assessments available.</div>
                </div>
            </div>
        );
    }
}
