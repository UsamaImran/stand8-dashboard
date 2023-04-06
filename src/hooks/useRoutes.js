import { lazy, useMemo } from 'react';
import { isEmpty, isArray } from 'lodash';
import { useSelector } from 'react-redux';
import { screens } from '../config/screens';

const importCom = filePath => lazy(() => import(`../container/${filePath}`).catch(() => {}));

const useRoutes = () => {
  const userOrg = useSelector(state => state.auth?.user?.access);
  const [appRoutes, accessMenuItems] = useMemo(() => {
    if (isEmpty(userOrg)) {
      return [[], []];
    }
    const routes = [];

    const menus = screens
      .sort((a, b) => a.order - b.order)
      .map(screen => {
        if (isArray(screen.menuItems)) {
          const subItems = screen.menuItems.filter(ite => userOrg.includes(ite.key));
          if (subItems.length > 0) {
            return {
              ...screen,
              menuItems: subItems,
            };
          }
          return null;
        }
        if (userOrg?.includes(screen.key)) {
          return screen;
        }
        return null;
      })
      .filter(x => x);

    menus.forEach(screen => {
      if (screen.menuType === 'menu' || screen.menuType === 'topMenu' || screen.menuType === 'adminMenu') {
        return routes.push({
          key: screen.key,
          path: screen.path,
          component: importCom(screen.filePath),
          exact: screen.exact,
        });
      }

      return screen.menuItems.map(menu =>
        routes.push({
          path: menu.path,
          key: menu.key,
          component: importCom(menu.filePath),
          exact: menu.exact,
        }),
      );
    });

    return [routes, menus];
  }, [userOrg]);

  return [appRoutes, accessMenuItems];
};

export default useRoutes;
