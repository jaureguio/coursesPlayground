import { UserConsumer } from './UserContext'
import React from 'react';

class UserMenu extends React.Component {
  state = {
    menuVisible: false
  };

  avatarRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.hideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideMenu);
  }

  hideMenu = e => {
    // Ignore clicks on the avatar
    // so that the menu can open
    if (e.target !== this.avatarRef.current) {
      this.setState({ menuVisible: false });
    }
  };

  toggleMenu = () => {
    this.setState(state => ({
      menuVisible: !state.menuVisible
    }));
  };

  render() {
    return (
      <UserConsumer>
        {({currentUser, onLogout}) => (
          <div className="UserMenu">
            <img
              className="UserAvatar"
              alt="User avatar"
              // src={currentUser.avatar}
              onClick={this.toggleMenu}
              ref={this.avatarRef}
            />
            {this.state.menuVisible && (
              <ul>
                <li onClick={onLogout}>Logout</li>
              </ul>
            )}
          </div>
        )}
      </UserConsumer>
    );
  }
}

export default UserMenu;