import React, { useState } from 'react';

import Button from './components/Button/button'

import Alert, { AlertType } from './components/Alert/alert'

import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

import Icon from './components/Icon/icon'

import Transition from './components/Transition/transition'

function App () {
  const [ show, setShow ] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        {/* Icon */}
        {/* <Icon icon="coffee" theme="primary" size="10x" /> */}
        {/* button */}
        {/* <Button autoFocus> Hello </Button>
        <Button disabled> Disabled Button </Button>
        <Button size='lg' btnType='primary'> Large Primary </Button>
        <Button size='sm' btnType='danger'> Small Danger </Button>
        <Button btnType='link' href="http://www.baidu.com"> Baidu Link </Button>
        <Button btnType='link' href="http://www.baidu.com" disabled> Disabled Link </Button> */}
        {/* alert */}
        {/* <Alert onClose={() => { alert('知道了') }}>this is a description</Alert>
        <Alert type={AlertType.Success}>this is a description</Alert>
        <Alert type={AlertType.Danger} closable={false} title={'this is a title'} >this is a description</Alert>
        <Alert type={AlertType.Warning} closeTest={'知道了'} title={'this is a title'}></Alert> */}
        {/* Menu */}
        <Menu defaultIndex='0' onSelect={(index) => {alert(index)}}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
             dropdown 1
            </MenuItem>
            <MenuItem>
             dropdown 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>
        {/* Transition */}
        {/* <Button size='lg' onClick={() => {setShow(!show)}}> Toggle </Button>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
        >
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
          wrapper
        >
          <Button size="lg" btnType="primary">A Single Button </Button>
        </Transition> */}
      </header>
    </div>
  );
}

export default App;
