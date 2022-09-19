import type { Router } from "vue-router";
import { isNavigationFailure } from "vue-router";
import { useAsyncRouteStoreWidthOut } from "@/stores/modules/asyncRoute";
import { createPermissionGuard } from "./permissions";

type Recordable<T = any> = {
  [x: string]: T;
};

export function createRouterGuards(router: Router) {
  const asyncRouteStore = useAsyncRouteStoreWidthOut();
  // const userStore = useUserStore();
  // const systemStore = useSystemSettingStore();

  router.beforeEach(async (to, from, next) => {
    //开启loading
    const Loading = window["$loading"] || null;
    Loading && Loading.start();

    // 页面跳转权限处理
    await createPermissionGuard(to, from, next);

    // if (asyncRouteStore.getIsDynamicAddedRoute) {
    //   next();
    //   return;
    // }

    // 将路由转化为菜单
    // const permissions = await JSON.parse((await getPermissions()).data);
    // const permissions = [];
    // const routes = await asyncRouteStore.initDynamicRoute(permissions);

    // 动态添加可访问路由表
    // routes.forEach((item) => {
    //   router.addRoute(item as unknown as RouteRecordRaw);
    // });

    // const redirectPath = (from.query.redirect || to.path) as string;
    // const redirect = decodeURIComponent(redirectPath);
    // const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    // asyncRouteStore.setDynamicAddedRoute(true);
  });

  /**
   * 后置路由守卫
   */
  router.afterEach((to, _from, failure) => {
    //设置页面的标题
    document.title = (to?.meta?.title as string) || document.title;

    // 导航故障
    if (isNavigationFailure(failure)) {
      console.log("failed navigation", failure);
    }

    //loading完成
    const Loading = (window as any).$loading || null;
    Loading && Loading.finish();
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}