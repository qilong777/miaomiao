const Movie = () => import('views/Movie');
const City = () => import('components/City');
const NowPlaying = () => import('components/NowPlaying');
const ComingSoon = () => import('components/ComingSoon');
const Search = () => import('components/Search');
const detail = () => import('views/Movie/detail');
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
    },
    {
      path: 'nowDetail/:movieId',
      components: {
        default: NowPlaying,
        detail
      },
      props: {
        detail: true
      }
    },
    {
      path: 'comingDetail/:movieId',
      components: {
        default: ComingSoon,
        detail
      },
      props: {
        detail: true
      }
    }
  ]
}