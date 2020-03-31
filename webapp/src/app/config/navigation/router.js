import Vue from 'vue';
import Router from 'vue-router';
import Login from '../../modules/conta/conta-login/Login.vue';
import Instituicoes from './../../modules/instituicao/instituicao-list/InstituicaoList.vue';
import PerfilInstituicao from '../../modules/instituicao/instituicao-perfil/InstituicaoPerfil.vue';
import Cadastrar from '../../../app/modules/conta/conta-form/Cadastrar.vue';
import Pontos from './../../modules/ponto/ponto-list/Pontos.vue';
import PontoPerfil from '../../modules/ponto/ponto-perfil/Perfil.vue';
import Home from './../../../app/modules/home/Home.vue';
import Conta from '../../modules/conta/conta-list/Conta.vue';
import store from './../settings/store';
import Main from './../../../app/modules/home/Main.vue';
import { obterInformacoesJWT } from '../../modules/account/_helpers/jwt';
import Eventos from '../../modules/evento/evento-list/Eventos.vue';

Vue.use(Router);

const routesObject = [
  {
    path: '/instituicao/:id',
    component: PerfilInstituicao,
    props: true,
    meta: {
      title: 'perfil'
    }
  },
  {
    path: '/main',
    component: Main,
    meta: {
      title: 'Principal'
    }
  },
  {
    path: '/ponto/:id',
    component: PontoPerfil,
    name: 'pontoPerfil',
    props: true
  },
  {
    path: '/pontos',
    component: Pontos,
    name: 'pontos',
    meta: {
      title: 'Principal'
    }
  },
  {
    path: '/eventos',
    component: Eventos,
    name: 'eventos',
    meta: {
      title: 'Eventos'
    }
  },
  {
    path: '/instituicoes',
    component: Instituicoes,
    name: 'instituicoes',
    meta: {
      title: 'instituicoes'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: { layout: 'no-side-bar' }
  },
  {
    path: '/cadastrar',
    component: Cadastrar,
    meta: { layout: 'no-side-bar' }
  },
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: { layout: 'no-side-bar' }
  },
  {
    path: '/administracao/conta',
    component: Conta,
    name: Conta,
    meta: {
      title: 'Conta'
    }
  }
];

const router = new Router({
  mode: 'history',
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes: routesObject
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/cadastrar', '/instituicaes', '/sobre', '/'];

  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (to.path === '/logout') {
    store.dispatch('alert/info', 'Logout realizado com sucesso.', {
      root: true
    });
    return next('/login');
  }

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  try {
    obterInformacoesJWT();

    return next();
  } catch (Exception) {
    localStorage.removeItem('token');
    store.dispatch('alert/error', `Erro: ${Exception}`, { root: true });
    return next('/login');
  }
});

export default router;