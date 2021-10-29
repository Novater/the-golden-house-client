export default class tableFunctions {

  static initializeTableFilters = (filters, filterClass, onClick) => {
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

  static initializeTableHeaders = (headers, headerClass, onClick) => {
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
      return (
        <tr className={props.className || ''}>
          <td>{props.record.time}</td>
          <td>{props.record.alias}</td>
          <td>{Number(props.record.version)}</td>
          <td>{props.record.region}</td>
          <td>{props.record.link}</td>
          <td>{props.record.characters.toString()}</td>
          <td>{props.record.notes}</td>
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