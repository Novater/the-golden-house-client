export default class tableFunctions {

  static initializeTableFilters = (filterClass, filters, onClick) => {
    return (
      <div className={filterClass}>
        {
          filters.map(el => {
            return <button onClick={onClick}>{el}</button>
          })
        }
      </div>
    );
  }

  static initializeTableHeaders = (headerClass, headers, onClick) => {
    return {
      className: headerClass,
      headers: headers,
      onClick: onClick
    };
  }

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

              return (
                <td>{record[header].toString()}</td>
              )
            })
          }
        </tr>        
      );
    };

    for (let row of rows) {
      if (search) {
        console.log(JSON.stringify(row));
        console.log('search', search);
        if (JSON.stringify(row).toLowerCase().indexOf(search.toLowerCase()) < 0) continue;
      }
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