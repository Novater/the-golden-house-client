import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function NewPost({ direction, id, onClick }) {
  return (
    <div
      className={`new-post-${direction}`}
      id={`${direction}-${id}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faPlus} />
    </div>
  )
}
