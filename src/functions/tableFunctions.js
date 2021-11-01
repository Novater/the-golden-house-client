import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

export default class tableFunctions {

  /**
   * 
   * @param {*} param0 
   * @param  {...any} keys 
   * @returns 
   */
  static createHeaderDataMapping = ({ title, format, keys }) => {

    return {
      title,
      format,
      keys
    };
  }

  /**
   * @param {*} filterClass 
   * @param {*} filters 
   * @param {*} onClick 
   * @returns Filters JSX
   */
  static initializeTableFilters = ({ title, filterClass, filters, onChange, defaultValue }) => {

    return (
      <div className={filterClass}>
        <p>{`${title}: `}</p>
        <select className='form-select' onChange={onChange} defaultValue={defaultValue}>
          {
            filters.headers.map(el => {
              return <option>{el}</option>;
            })
          }
        </select>
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
  static createTable = (wrapperClassName, tableClassName, headers, rows, search, currPage, rowFilter, footerObj, pagination) => {
    function initializeTableFooters({ footerClass, rowOptions, rowClass, onRowUpdate, paginationClass, paginationValues, paginationFunc, numRows }) {
      let rowOptionEls = [];
      let paginationEls = [];

      for (let rowOption of rowOptions.rows) {
        rowOptionEls.push(
          <option>{rowOption}</option>
        );
      }
      
      if (pagination) {
        let numPages = rowOptions.selected ? Math.ceil(numRows / rowOptions.selected) : 1;

        if (numPages > 1) {
          paginationEls.push(
            <li className='page-item'><a class='page-link' href='#' onClick={paginationFunc}>Previous</a></li>
          );
          for (let i = 0; i < numPages; i += 1) {
            if (i + 1 == currPage) {
              paginationEls.push(
                <li className='page-item focused'><a class='page-link' href='#' onClick={paginationFunc}>{i + 1}</a></li>
              );
            } else {
              paginationEls.push(
                <li className='page-item'><a class='page-link' href='#' onClick={paginationFunc}>{i + 1}</a></li>
              );
            }
          }
          paginationEls.push(
            <li className='page-item'><a class='page-link' href='#' onClick={paginationFunc}>Next</a></li>
          );
        }
      }

      return (
        <div className={footerClass}>
          <div className={rowClass}>
            <p>Rows Displayed: </p>
            <select className='form-select' onChange={onRowUpdate} defaultValue={rowOptions.selected}>
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

    let tableBuildRows = [];
    
    function TableEntry(props) {
      const record = props.record;
      let headerKeyFormats = headers.headers;

      return (
        <tr className={props.className || ''}>
          {
            headerKeyFormats.map(header => {
              if (header.title === 'Rank') {
                return (
                  <td><div className='rank-col' id={`rank-${record['rank']}`}>{record['rank']}</div></td>
                );
              }

              let format = header.format;
              const keys = header.keys;

              for (let key of keys) {
                format = format.replace(`{${key}}`, record[key] || '');
              }

              return (
                <td dangerouslySetInnerHTML={{ __html: format.toString() }}></td>
              )
            })
          }
        </tr>        
      );
    };

    let maxRows = rows.length;
    rows = rows.slice((currPage - 1) * rowFilter);
    let currRow = (currPage - 1) * rowFilter;
    console.log('currow',currRow);
    let numRows = 0;

    console.log('maxRows', maxRows);
    while (numRows < rowFilter && currRow < maxRows) {
      const row = rows[numRows++];
      currRow += 1;
      // if (search) {
      //   if (JSON.stringify(row).toLowerCase().indexOf(search.toLowerCase()) < 0) continue;
      // }

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
      <div className={wrapperClassName}>
        <div className={tableClassName}>
          <table className={tableClassName}>
            <tr className={headers.className} onClick={headers.onClick}>
              {headers.headers.map(header => {
                return (
                  <th name={header.title}>
                    {header.title}
                  </th>
                );
              })}
            </tr>
            <tbody>
              {tableBuildRows}
            </tbody>
          </table>          
        </div>
        {footer}
      </div>
    );
  };
};