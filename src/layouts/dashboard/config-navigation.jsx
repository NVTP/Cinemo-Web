import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'My Finder',
    path: '/home',
    icon: icon('ic_cart'),
  },
  {
    title: 'Movie Favorite ',
    path: '/favorite',
    icon: icon('ic_analytics'),
  },
  {
    title: 'logout',
    path: '/',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
