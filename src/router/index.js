import { createRouter, createWebHistory } from 'vue-router';
import Book from '@/views/Book.vue';
import Contact from '@/views/Contact.vue';

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
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/book',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
