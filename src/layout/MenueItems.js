import React from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Menu } from 'antd';
import FeatherIcon from 'feather-icons-react';
import useRoutes from '../hooks/useRoutes';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [, accessMenuItems] = useRoutes();

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const user = useSelector(state => state.auth.user);

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      {accessMenuItems.map(item => {
        if (item.menuType === 'menu') {
          return (
            <Menu.Item
              key={item.key}
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}${item.path}`}>
                    <FeatherIcon icon={item.icon} />
                  </NavLink>
                )
              }
            >
              <NavLink onClick={toggleCollapsed} to={`${path}${item.path}`}>
                {item.value}
              </NavLink>
            </Menu.Item>
          );
        }
        if (item.menuType === 'submenu') {
          return (
            <SubMenu key={item.key} icon={!topMenu && <FeatherIcon icon={item.icon} />} title={item.value}>
              {item.menuItems.map(menu => (
                <Menu.Item key={menu.key}>
                  <NavLink onClick={toggleCollapsed} to={`${path}${menu.path}`}>
                    {menu.value}
                  </NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          );
        }

        if (item.menuType === 'adminMenu' && (user.role === 'admin' || user.role === 'superAdmin')) {
          return (
            <React.Fragment key={item.key}>
              {/* {!topMenu && (
                <Menu.Item className="sidebar-admin-wrapp" disabled key="disabled-admin">
                  <p className="sidebar-admin-title">Admin</p>
                </Menu.Item>
              )} */}
              <Menu.Item
                key={item.key}
                icon={
                  !topMenu && (
                    <NavLink className="menuItem-iocn" to={`${path}${item.path}`}>
                      <FeatherIcon icon={item.icon} />
                    </NavLink>
                  )
                }
              >
                <NavLink onClick={toggleCollapsed} to={`${path}${item.path}`}>
                  {item.value}
                </NavLink>
              </Menu.Item>
            </React.Fragment>
          );
        }
        return null;
      })}
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
