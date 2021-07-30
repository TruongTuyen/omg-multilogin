/**
 * 页面资源集合，请不要在主进程中引用
 */

// 设为 undefined 将不会创建路由，一般用于重定向
export const Home = undefined;

export const Demo = import('./views/demo/demo');
export const PageParams = import('./views/demo/page-params');
export const LogViewer = import('./views/log-viewer/log-viewer');
export const About = import('./views/about/about');

export const NoMatch = import('./views/no-match/no-match');
export const NewProfile = import('./views/new-profile/new-profile');

export const Profiles = import('./views/profiles/profiles');
export const TeamMembers = import('./views/team-members/teamMembers');
export const MyAccount = import('./views/my-account/MyAccount');
export const Plugins = import('./views/plugins/plugins');
export const SupportCenter = import('./views/support-center/SupportCenter');
export const Overview = import('./views/new-profile/overview');
export const Proxy = import('./views/new-profile/proxy');
export const Timezone = import('./views/new-profile/timezone');
export const WebRTC = import('./views/new-profile/webRTC');
export const Geolocation = import('./views/new-profile/geolocation');
export const Advanced = import('./views/new-profile/advanced');

// 同步引用，注意这不会触发 beforeRouter
export { default as AlertModal } from './views/modals/alert-modal';
