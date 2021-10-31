export default class tableFunctions {

  /**
   * @param {*} filterClass 
   * @param {*} filters 
   * @param {*} onClick 
   * @returns Filters JSX
   */
  static initializeTableFilters = (filterClass, filters, onClick) => {
    return (
      <div className={filterClass} role='group'>
        {
          filters.map(el => {
            return <button name={el} className='btn' type='button' onClick={onClick}>{el}</button>
          })
        }
      </div>
    );
  }

  /**
   * @param {*} headerClass 
   * @param {*} headers 
   * @param {*} onClick 
   * @returns Headers object to pass into createTable
   */
  static initializeTableHeaders = (headerClass, headers, onClick) => {
    return {
      className: headerClass,
      headers: headers,
      onClick: onClick
    };
  }

  /**
   * @param {*} tableClassName 
   * @param {*} headers 
   * @param {*} rows 
   * @param {*} search 
   * @description The columns of the table are defined by the headers
   * @returns Table JSX
   */
  static createTable = (tableClassName, headers, rows, search, currRowIndex, rowFilter, footerObj) => {

    function initializeTableFooters({ footerClass, rowOptions, rowClass, onRowUpdate, paginationClass, paginationValues, paginationFunc, numRows }) {
      console.log('numRows', numRows);
      console.log('rowOptions.selected', rowOptions.selected);
      let rowOptionEls = [];
      let paginationEls = [];

      for (let rowOption of rowOptions.rows) {
        if (rowOption == rowOptions.selected) {
          rowOptionEls.push(
            <option selected>{rowOption}</option>
          );
        } else {
          rowOptionEls.push(
            <option>{rowOption}</option>
          );
        }
      }
      
      let numPages = rowOptions.selected ? Math.ceil(numRows / rowOptions.selected) : 1;

      if (numPages > 1) {
        paginationEls.push(
          <li class='page-item'><a class='page-link' onClick={paginationFunc}>Previous</a></li>
        );
        for (let i = 0; i < numPages; i += 1) {
          paginationEls.push(
            <li class='page-item'><a class='page-link' onClick={paginationFunc}>{i + 1}</a></li>
          )
        }
        paginationEls.push(
          <li class='page-item'><a class='page-link' onClick={paginationFunc}>Next</a></li>
        );
      }

      return (
        <div className={footerClass}>
          <div className={rowClass}>
            <p>Rows Displayed: </p>
            <select className='form-select' onChange={onRowUpdate}>
              {rowOptionEls}
            </select>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              {paginationEls}
            </ul>
          </nav>
        </div>
      );
    }

    let className = tableClassName.toString();
    let tableBuildRows = [];
    
    function TableEntry(props) {
      const record = props.record;
      const lowerCaseHeaders = headers.headers.map(header => header.toLowerCase());

      return (
        <tr className={props.className || ''}>
          {
            lowerCaseHeaders.map(header => {
              if (!record[header]) {
                return (
                  <td></td>
                );
              }

              if (header === 'rank') {
                return (
                  <td><div className='rank-col' id={`rank-${record[header]}`}>{record[header]}</div></td>
                );
              }

              return (
                <td dangerouslySetInnerHTML={{ __html: record[header].toString() }}></td>
              )
            })
          }
        </tr>        
      );
    };

    let rank = 1;
    let maxRows = rows.length;
    rows = rows.slice(currRowIndex);
    let currRow = currRowIndex;
    let numRows = 0;

    while (numRows < rowFilter && currRow < maxRows) {
      const row = rows[currRow++];

      if (search) {
        if (JSON.stringify(row).toLowerCase().indexOf(search.toLowerCase()) < 0) continue;
      }

      row.thisRec.rank = rank++;
      numRows += 1;

      tableBuildRows.push(
        <TableEntry 
          className={row.trClass}
          record={row.thisRec}
          key={row.thisRec._id}
        />
      );
    }

    let footer = initializeTableFooters({
      footerClass: footerObj.footerClass,
      rowOptions: footerObj.rowOptions,
      rowClass: footerObj.rowClass,
      onRowUpdate: footerObj.onRowUpdate,
      paginationClass: footerObj.paginationClass,
      paginationValues: footerObj.paginationValues,
      paginationFunc: footerObj.paginationFunc,
      numRows: maxRows
    });

    return (
      <div className={tableClassName}>
        <table className={tableClassName}>
          <tr className={headers.className} onClick={headers.onClick}>
            {headers.headers.map(header => {
              return (
                <th>{header}</th>
              );
            })}
          </tr>
          <tbody>
            {tableBuildRows}
          </tbody>
        </table>
        {footer}
      </div>
    );
  };
};