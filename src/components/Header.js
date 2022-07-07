import './Header.css'

function Header(props) {
  const { logout } = props
  return (
    <div className="header-component">
        <div>Header</div>
        <button onClick={logout}>Log out</button>
    </div>
  )
}

export default Header;