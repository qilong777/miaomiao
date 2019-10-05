const Movie = () => import('views/Movie');
const City = () => import('components/City');
const NowPlaying = () => import('components/NowPlaying');
const ComingSoon = () => import('components/ComingSoon');
const Search = () => import('components/Search');

export default {
  path: '/movie',
  component: Movie,
  children: [
    {
      path: '',
      redirect: '/movie/nowPlaying'
    },
    {
      path: 'city',
      component: City
    },
    {
      path: 'nowPlaying',
      component: NowPlaying
    },
    {
      path: 'comingSoon',
      component: ComingSoon
    }, {
      path: 'search',
      component: Search
    }
  ]
}