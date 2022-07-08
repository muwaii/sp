import './Header.css'

function Header(props) {
  const { logout } = props
  return (
    <div className="header-component">
        <div className='header-text'>Special Point</div>
        <button className='logout-btn' onClick={logout}>Log out</button>
    </div>
  )
}

export default Header;