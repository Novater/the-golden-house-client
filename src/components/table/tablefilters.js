/* eslint-disable */

import React from 'react'
import _ from 'lodash'

/**
 * @param {*} filterClass
 * @param {*} filters
 * @param {*} onClick
 * @returns Filters JSX
 */

export default function TableFilters({
  title,
  filterClass,
  filters,
  onChange,
  defaultValues,
  filterStyle,
}) {
  const FILTER_STYLES = {
    CHECKBOX: 'checkbox',
  }
  
  if (filterStyle === FILTER_STYLES.CHECKBOX) {
    return (
      <div className={filterClass}>
        <p style={{ width: '100%' }}>{`${title}: `}</p>
        {filters.map((el, idx) => (
          <div
            className="checkbox-filter"
            key={`${el.title}-${idx}-checkbox`}
            id={`${el.title}-${idx}-checkbox`}
          >
            <input
              className="form-check-input filter-checkbox"
              type="checkbox"
              name={title}
              value={el.title}
              id={`filter-${el.title}`}
              onChange={onChange}
              checked={!!el.selected}
            />
            <label
              className="form-check-label filter-label"
              htmlFor={`filter-${el.title}`}
            >
              {el.title}
            </label>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={filterClass}>
      <p style={{ width: '100%' }}>{`${title}: `}</p>
      <select
        className="form-select"
        name={title}
        onChange={onChange}
        defaultValue={defaultValues[0].title}
        key={`${title}-dropdown`}
        id={`${title}-dropdown`}
      >
        {filters.map((el, idx) => (
          <option
            id={`${el.title}-dropdown-${title}`}
            key={`${el.title}-dropdown-${title}`}
          >
            {el.title}
          </option>
        ))}
      </select>
    </div>
  )
}
