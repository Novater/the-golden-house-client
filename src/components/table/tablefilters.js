/* eslint-disable */

import React, { useEffect } from 'react'
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
  useEffect(() => {
    console.log('filters changed')
  }, [filters])
  if (filterStyle === 'checkbox') {
    return (
      <div className={filterClass}>
        <p style={{ width: '100%' }}>{`${title}: `}</p>
        {filters.map((el, idx) => (
          <div className="checkbox-filter" key={`filter-${el.title}-${idx}`}>
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
      >
        {filters.map((el, idx) => (
          <option key={`filter-option-${el.title}-${idx}`}>{el.title}</option>
        ))}
      </select>
    </div>
  )
}
