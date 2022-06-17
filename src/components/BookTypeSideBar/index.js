import './index.css'

const BookTypeSideBar = props => {
  const {changeTheBookShelf, bookshelfDetails, shelfName} = props
  const {id, value, label} = bookshelfDetails

  const onChangeBookShelf = () => {
    changeTheBookShelf(value)
  }
  const activeClassColor = shelfName === value ? 'activeClassColor' : ''

  return (
    <li
      onClick={onChangeBookShelf}
      className={`book-shelf-item ${activeClassColor}`}
    >
      {label}
    </li>
  )
}

export default BookTypeSideBar
