import { createRouter, createWebHistory } from 'vue-router';
import Book from '@/views/Book.vue';
import Contact from '@/views/Contact.vue';

const contactProps = (route) => {
  const o = { ...route.params };
  return {
    data: o,
  };
};

const routes = [
  {
    path: '/',
    alias: '/book',
    name: 'Book',
    component: Book,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    props: contactProps,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
