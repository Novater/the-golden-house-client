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

  static initializeTableFooters = ({ footerClass, rowOptions, rowClass, paginationClass, paginationValues, paginationFunc }) => {

    let rowOptionEls = [];

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

    return (
      <div className={footerClass}>
        <div className={rowClass}>
          <p>Rows: </p>
          <select className='form-select'>
            {rowOptionEls}
          </select>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    );
  }
  /**
   * @param {*} tableClassName 
   * @param {*} headers 
   * @param {*} rows 
   * @param {*} search 
   * @description The columns of the table are defined by the headers
   * @returns Table JSX
   */
  static createTable = (tableClassName, headers, rows, search) => {
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
    for (let row of rows) {
      if (search) {
        if (JSON.stringify(row).toLowerCase().indexOf(search.toLowerCase()) < 0) continue;
      }

      row.thisRec.rank = rank++;

      tableBuildRows.push(
        <TableEntry 
          className={row.trClass}
          record={row.thisRec}
          key={row.thisRec._id}
        />
      );
    }

    return (
      <table class={className}>
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
    );
  };
};