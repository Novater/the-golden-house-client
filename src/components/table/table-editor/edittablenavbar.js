import React from 'react'
const EDIT_TABLE_SUBTABS = require('../../../config').edittablesubtabs
const TABLE_HEADER_KEYS = require('../../../config').tableheaderkeys

export default function EditTableNavbar({
  currentSelectedTab,
  elements,
  finishEdit,
  selectNewTab,
}) {
  function setSubTab(event) {
    selectNewTab(event.target.innerText)
  }

  return (
    <nav className={`edit-table-nav`}>
      {elements.map((element) => {
        if (element === EDIT_TABLE_SUBTABS.FINISH_EDIT) {
          return (
            <div
              className={`table-subtab ${
                element === currentSelectedTab ? `selected` : ``
              }`}
              onClick={finishEdit}
              key={`edit-table-navbar-${element}`}
            >
              {element}
            </div>
          )
        }
        return (
          <div
            className={`table-subtab ${
              element === currentSelectedTab ? `selected` : ``
            }`}
            onClick={setSubTab}
            key={`edit-table-navbar-${element}`}
          >
            {element}
          </div>
        )
      })}
    </nav>
  )
}
