import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App () {
  return (
    <div className="App">
      <header className="App-header">
        {/* button */}
        {/* <Button autoFocus> Hello </Button>
        <Button disabled> Disabled Button </Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Primary}> Large Primary </Button>
        <Button size={ButtonSize.Small} btnType={ButtonType.Danger}> Small Danger </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com"> Baidu Link </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled> Disabled Link </Button> */}
        {/* alert */}
        {/* <Alert onClose={() => { alert('知道了') }}>this is a description</Alert>
        <Alert type={AlertType.Success}>this is a description</Alert>
        <Alert type={AlertType.Danger} closable={false} title={'this is a title'} >this is a description</Alert>
        <Alert type={AlertType.Warning} closeTest={'知道了'} title={'this is a title'}></Alert> */}
        {/* Menu */}
        <Menu defaultIndex={0}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link 2
          </MenuItem>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
