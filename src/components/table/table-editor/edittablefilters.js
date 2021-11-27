import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageModal from '../../modal'
import { faPen } from '@fortawesome/free-solid-svg-icons'
export default function FilterValues({
  content,
  addNewFilter,
  editFilter,
  deleteFilter,
}) {
  const [filterPreviewIdx, toggleFilterPreviewIdx] = useState(null)
  const [filterEditIdx, toggleFilterEditIdx] = useState(null)
  const [filterEditTitle, toggleFilterEditTitle] = useState(null)
  const [filterEditString, toggleFilterEditString] = useState(null)
  const [screenX, toggleScreenX] = useState(null)
  const [screenY, toggleScreenY] = useState(null)

  function openFilterPreview(index) {
    return function (event) {
      const targetEl = event.target.getBoundingClientRect()
      toggleFilterPreviewIdx(index)
      toggleScreenX(targetEl.right - targetEl.width / 2)
      toggleScreenY(event.target.getBoundingClientRect().bottom + 20)
    }
  }

  function finishFilterEdit(event) {
    editFilter({
      filterIndex: filterEditIdx,
      title: filterEditTitle,
      lookFor: filterEditString,
    })
    toggleFilterEditIdx(null)
  }

  function closeFilterPreview(event) {
    toggleFilterPreviewIdx(null)
  }

  function openFilterEdit(index) {
    return function (event) {
      toggleFilterEditTitle(content[index].title)
      toggleFilterEditString(content[index].lookFor)
      toggleFilterEditIdx(index)
    }
  }

  function updateTitle(event) {
    toggleFilterEditTitle(event.target.value)
  }

  function updateLookFor(event) {
    toggleFilterEditString(event.target.value)
  }

  return (
    <div className="filter-value-container">
      {filterEditIdx !== null ? (
        <div className="filter-edit">
          <span className="filter-edit-row">
            <p>{'Title: '}</p>
            <input value={filterEditTitle} onChange={updateTitle}></input>
          </span>
          <span className="filter-edit-row">
            <p>{'Filter By: '}</p>
            <input value={filterEditString} onChange={updateLookFor}></input>
          </span>
          <span className="filter-edit-row">
            <button onClick={finishFilterEdit}>Done</button>
          </span>
        </div>
      ) : (
        <>
          {content.map((filter, idx) => {
            const { title, lookFor } = filter
            const uuid = Math.random()
            return (
              <>
                <div
                  className="filter-value"
                  key={`${title}-${lookFor}-${uuid}`}
                  title={title}
                >
                  <div
                    className="filter-name"
                    onMouseEnter={openFilterPreview(idx)}
                    onMouseLeave={closeFilterPreview}
                  >
                    <p>{title}</p>
                  </div>
                  <button
                    className="edit-filter btn"
                    type="button"
                    onClick={openFilterEdit(idx)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="delete-filter btn"
                    type="button"
                    auria-label="remove-filter"
                    onClick={deleteFilter(idx)}
                  >{`X`}</button>
                </div>
                {filterPreviewIdx !== null ? (
                  <div
                    className="filter-preview"
                    style={{
                      position: 'fixed',
                      left: `${screenX}px`,
                      top: `${screenY}px`,
                    }}
                  >
                    <p>{`Title: ${content[filterPreviewIdx].title}`}</p>
                    <p>{`Matching: ${content[filterPreviewIdx].lookFor}`}</p>
                  </div>
                ) : null}
              </>
            )
          })}
          <div
            className="add-new-filter"
            onClick={addNewFilter}
            title={`Add New Filter`}
          >{`+`}</div>
        </>
      )}
    </div>
  )
}
